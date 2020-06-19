import React, { Component } from 'react'
import {Tabs,Radio} from 'antd'

const { TabPane } = Tabs;

export default class list2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mode: 'left',
        };
      }
      async componentWillMount(){
        let data = await http.get("/all2")
        
        this.setState({
          title:this.props.match.params.title,
          data
        })
        
      }
      goto = (id)=>{
        const {history} = this.props
        history.push('/detail/' + id)
      }
      back = ()=>{
        const {history} = this.props
        history.push('/list')
      }
      render() {
        const { mode } = this.state;
        return (
          <div>
            <header className="page-head">
                <a>
                    <i>
                        <ArrowLeftOutlined onClick={this.back} style={{fontSize:22,color:'#58bc58'}}/>  
                    </i>
                </a>
              <h1>{this.state.title}</h1>
            </header>
            <section id="search search-list radius">
                <Input.Group compact>
                    <Select defaultValue="广州" size="large">
                        <Option value="广州">广州</Option>
                        <Option value="上海">上海</Option>
                        <Option value="北京">北京</Option>
                        <Option value="深圳">深圳</Option>
                    </Select>
                    <Input style={{ width: '79.6%' }} defaultValue="请输入你想要去的地方" prefix="" size="large"/>
                </Input.Group>
            </section>
            <Tabs defaultActiveKey="1"tabBarGutter={20} tabBarStyle={{marginLeft:20}}>
              <TabPane tab="全部" key="1">
                <ul className="item-tr" style={{background:"#fff"}}>
                           {
                              data.map((item,index)=>{ 
                                return <li className="item-list" key={index} onClick={()=>{
                                  this.goto(item.bussinessProductId)
                                }}>
                                        <figure className="img-outer">
                                            <i className="type">{item.attributeName}</i>
                                            {/* eval把字符串转换成数组 */}
                                            <i className="tag">{eval(item.departureCitys)[0] + item.cityType}</i>
                                            <img src={item.picture} alt=""/>
                                        </figure>
                                        <div id="txt-outer">
                                            <h2>{item.name}</h2>
                                            <ul className="money">
                                            <p className="label">
                                              <i style={{backgroundColor:"#00be88"}}>{item.brandName} </i>
                                              {
                                                JSON.parse(item.productThemes).map((ele,idx)=>{
                                                  return <span key={idx}>  {ele} </span>
                                                })
                                              } 
                                            </p>
                                            <p className="margintb">班期：{JSON.parse(item.schedule).months.join(",")}</p>
                                            <li className="crred">¥<em>{JSON.parse(item.schedule).minPrice}</em>起</li> 
                                            </ul>
                                        </div>
                                    </li>
                               })
                          }
                    </ul>
              </TabPane>
              <TabPane tab="自由行" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="团队游" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="当地游" key="4">
                Content of Tab Pane 4
              </TabPane>
              <TabPane tab="酒店套餐" key="5">
                Content of Tab Pane 5
              </TabPane>
              <TabPane tab="门票" key="6">
                Content of Tab Pane 6
              </TabPane>
            </Tabs>
            
            <Tabs defaultActiveKey="0" tabPosition={mode} style={{ height: 400 }}>
              {[...Array(30).keys()].map(i => (
                <TabPane tab={`Tab-${i}`} key={i}>
                  Content of tab {i}
                </TabPane>
              ))}
            </Tabs>
          </div>
        );
      }
}

