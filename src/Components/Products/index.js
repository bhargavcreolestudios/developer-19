import React,{Component} from 'react'
import { Layout, Menu, Breadcrumb, Card, Button, List } from 'antd';
import axios from '../../utils/requestHandler'
import {builder} from './queryBuilder'
import {
 Container,
 LoadDiv
} from './product.style'


const { Header, Content } = Layout;
const { Meta } = Card;

export default class Products extends Component{
  state={
    products:[],
    loading:false,
    from:1, //page number
    limit:24,
    loaded:false
  }

  containerRef = null

  componentDidMount =()=>{
    const {from, limit} = this.state
    this.setState({
      loading:true
    },()=>{
      this.getProducts(from, limit)
    })
  }

  /**
   * Gets the products.
   *
   * @param      {number}  from    page from
   * @param      {number}  limit   The limit of records
   */
  getProducts = (from = 1, limit =10) =>{
    axios(builder(from,limit),({products})=>{
      if (products.length > 0) {
        var mergedProducts = [...this.state.products, ...products]
        this.setState((prevState, props) => ({
          products:mergedProducts,
          from: prevState.from + 1,
          loading:false
        }));
      }else{
        this.setState({
          loaded:true,
          loading:false
        })
      }
    },(error)=>{
      this.setState({
          loaded:true,
          loading:false
      })
    })
  }

  /**
   * Loads a more data.
   *
   */
  loadMore = () =>{
    const {from, limit} = this.state
    this.setState({
      loading:true
    },()=>{
      this.getProducts(from, limit)
    })
  }

  componentWillUnmount(){
    this.containerRef = null
  }

  render(){
    const {products, loading, loaded} = this.state

    const loadMore =
      !loaded ? (
        <LoadDiv>
          <Button onClick={this.loadMore} loading={loading}>{loading ? 'Loading...' : 'Load more'}</Button>
        </LoadDiv>
      ) : null;

    return(
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Products</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '2%' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
          </Breadcrumb>
          <Container ref={(node)=>{this.containerRef = node}}>
          <List
            loadMore={loadMore}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 6,
            }}
            dataSource={products}
            renderItem={product => (
              <List.Item>
                   <Card
                      hoverable
                      cover={
                        <img
                          alt={product.name}
                          src={product.image}
                        />
                      }
                    >
                      <Meta
                        title={product.name}
                        description={`$${product.price}`}
                      />
                    </Card>
              </List.Item>
            )}
          />
          </Container>
        </Content>
      </Layout>
      )
  }
}