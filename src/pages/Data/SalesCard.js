import React, { Component } from 'react';
import { Row, Col, Card, Tabs, DatePicker } from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';
import numeral from 'numeral';
import styles from './Analysis.less';
import { Bar } from '@/components/Charts';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `因果训练day${i}`,
    total: 323234,
  });
}



class SalesCard extends Component {

  state = {
    currentTabKey:''
  }
  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
    console.log(key,'currentTabKey')
  };
  
  
  render(){
    const { specialList,rangePickerValue, salesData, isActive, handleRangePickerChange, loading, selectDate } = this.props;

    return(
      <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          onChange={this.handleTabChange}
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a className={isActive('today')} onClick={() => selectDate('today')}>
                  今日
                </a>
                <a className={isActive('week')} onClick={() => selectDate('week')}>
                  本周
                </a>
                <a className={isActive('month')} onClick={() => selectDate('month')}>
                  本月
                </a>
                <a className={isActive('year')} onClick={() => selectDate('year')}>
                  全年
                </a>
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{ width: 256 }}
              />
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
      >

        {specialList.map(sitem=>{
          return (
            <TabPane
                    tab={sitem.title}
                    key={sitem.id}
                  >
                    <Row>
                      <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesBar}>
                          <Bar
                            height={295}
                            title={'试卷完成量'}
                            data={salesData}
                          />
                        </div>
                      </Col>
                      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesRank}>
                          <h4 className={styles.rankingTitle}>
                            试卷访问排名
                          </h4>
                          <ul className={styles.rankingList}>
                            {rankingListData.map((item, i) => (
                              <li key={item.title}>
                                <span
                                  className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                                >
                                  {i + 1}
                                </span>
                                <span className={styles.rankingItemTitle} title={item.title}>
                                  {item.title}
                                </span>
                                <span className={styles.rankingItemValue}>
                                  {numeral(item.total).format('0,0')}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
          )
        })
        }
         
        </Tabs>
      </div>
    </Card>
    )
  }


}


export default SalesCard;
