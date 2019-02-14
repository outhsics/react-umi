import React, { Component, div, Fragment } from 'react';
import {
  Icon,
  Tabs,
  Table,
  Button,
  Modal,
  Breadcrumb,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Radio,
  Card,
  Upload,
  message,
} from 'antd';
import { connect } from 'dva';
import NavLink from 'umi/navlink';

import moment from 'moment';

import styles from './List.less';
import { create } from 'domain';
const { TabPane } = Tabs;
const confirm = Modal.confirm;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const examList = [
  {
    id: 1,
    title: "Why can't the man go fishing tomorrow?",
    A: ' He has an important meeting',
    B: 'He has to go to the airport',
    C: "He has to go to Mr. Green's house",
    score: '5',
  },
  {
    id: 2,
    title: "Why can't the man go fishing tomorrow?",
    A: ' He has an important meeting',
    B: 'He has to go to the airport',
    C: "He has to go to Mr. Green's house",
    score: '5',
  },
];

const item1AddList = [];

const props = {
  name: 'file',
  action: 'https://api.jze100.com/hear/admin/file/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    console.log(info, 'info');
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

@connect(({ examlist, operate }) => ({
  examlist,
  operate,
}))
@Form.create()
class NewExam extends Component {
  state = {
    editItem: null,
    currentEditType: 1,
    showEdit: false,
  };

  componentDidMount() {
    const { location, dispatch, examlist } = this.props;
    const { paperDetail } = examlist;

    dispatch({
      type: 'examlist/fetchPaperDetail',
      payload: location.query.id,
    });

    dispatch({
      type: 'operate/fetchSpecialList',
    });

    // this.props.form.setFieldsValue({
    //   id: paperDetail.id,
    //   button: paperDetail.button,
    //   content: paperDetail.content,
    //   peopleBase: paperDetail.peopleBase,
    //   slogan: paperDetail.slogan,
    //   title: paperDetail.title,
    // });
  }

  onSubmitExam = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'exam/createPaper',
      payload: '',
    });
  };
  handleSubmit = () => {};

  handleEdit = item => {
    console.log(item);
    this.setState({
      editItem: item,
      showEdit: true,
    });
  };
  deleteExam = () => {};

  onUpload = () => {
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      contentType: undefined,
      mimeType: 'multipart/form-data',
      success: function(data) {
        //  success
        console.log(data, '12');
      },
    });
  };

  onChangeExamType = e => {
    console.log(e.target.value);
    if (e.target.value == 1) {
      this.setState({
        currentEditType: 1,
        showEdit: false,
      });
    }
    if (e.target.value == 2) {
      this.setState({
        currentEditType: 2,
        showEdit: false,
      });
    }
  };
  // deleteConfirm = id => {
  //   let title = '删除试题';
  //   let content = (
  //     <div>
  //       {' '}
  //       <p>新增试卷时，试题可以删除</p> <p>题目删除后不可复原，确认删除第{id}题吗？</p>
  //     </div>
  //   );

  //   confirm({
  //     title,
  //     content,
  //     onOk() {
  //       return new Promise((resolve, reject) => {
  //         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  //       }).catch(() => console.log('Oops errors!'));
  //     },
  //     onCancel() {},
  //   });
  // };

  renderNewSelectP = (resources = []) => {
    return (
      <Fragment>
        <Row>
          <Col span={3}>题目：</Col>
          <Col span={13}>
            <Input.TextArea placeholder={'富文本框'} rows={8} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={5}>
            <Row>
              <Col span={9}>7(1)</Col>
              <Col span={15}>
                <Input />
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row>
              <Col span={9}>7(2)</Col>
              <Col span={15}>
                <Input />
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row>
              <Col span={9}>7(3)</Col>
              <Col span={15}>
                <Input />
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row>
              <Col span={9}>7(1)</Col>
              <Col span={15}>
                <Input />
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row>
              <Col span={9}>7(1)</Col>
              <Col span={15}>
                <Input />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span={4}>答案:</Col>

          <Col span={20}>
            <Row>
              <Col span={10}>
                <Row>
                  <Col span={5}>71()</Col>
                  <Col span={11}>
                    <Input />
                  </Col>
                </Row>
              </Col>

              <Col span={7}>
                <Row>
                  <Col span={9}>72()</Col>
                  <Col span={11}>
                    <Input />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span={3}>解析:</Col>
          <Col span={11} style={{ mariginRight: 30 }}>
            <Input.TextArea placeholder={'专项说明文本（0/180）'} rows={8} />
          </Col>
          <Col span={8} style={{ mariginLeft: 30 }}>
            <Row style={{ textAlign: 'center' }}>
              <Button style={{ width: 120 }}>清空重新录入</Button>
            </Row>
            <Row style={{ textAlign: 'center' }}>
              <Button style={{ width: 120 }} type="primary">
                确定试题
              </Button>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  };

  renderSelectP = (resources = []) => {
    return (
      <Fragment>
        <Row>
          <Col span={3}>题目：</Col>
          <Col span={13}>
            <Input.TextArea placeholder={'富文本框'} rows={8} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={5}>
            <Row>
              <Col span={9}>7(1)</Col>
              <Col span={15}>
                <Input />
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row>
              <Col span={9}>7(2)</Col>
              <Col span={15}>
                <Input />
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row>
              <Col span={9}>7(3)</Col>
              <Col span={15}>
                <Input />
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row>
              <Col span={9}>7(1)</Col>
              <Col span={15}>
                <Input />
              </Col>
            </Row>
          </Col>

          <Col span={4}>
            <Row>
              <Col span={9}>7(1)</Col>
              <Col span={15}>
                <Input />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span={4}>答案:</Col>

          <Col span={20}>
            <Row>
              <Col span={10}>
                <Row>
                  <Col span={5}>71()</Col>
                  <Col span={11}>
                    <Input />
                  </Col>
                </Row>
              </Col>

              <Col span={7}>
                <Row>
                  <Col span={9}>72()</Col>
                  <Col span={11}>
                    <Input />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span={3}>解析:</Col>
          <Col span={11} style={{ mariginRight: 30 }}>
            <Input.TextArea placeholder={'专项说明文本（0/180）'} rows={8} />
          </Col>
          <Col span={8} style={{ mariginLeft: 30 }}>
            <Row style={{ textAlign: 'center' }}>
              <Button style={{ width: 120 }}>清空重新录入</Button>
            </Row>
            <Row style={{ textAlign: 'center' }}>
              <Button style={{ width: 120 }} type="primary">
                确定试题
              </Button>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  };

  renderSelectQs = (resources = []) => {
    const { editItem } = this.state;
    // debugger;
    return (
      <Fragment>
        <div className={styles.item1}>
          {editItem &&
            editItem.subTopics &&
            editItem.subTopics.map(sitem => {
              <Row key={sitem.id}>
                <Col span={6}>题目（{sitem.id}）:</Col>

                <Col span={18}>
                  <Input placeholder={sitem.title} />
                </Col>
              </Row>;
            })}

          <Row>
            <Col span={24}>
              <Button type="primary" style={{ width: '100%' }} icon={'plus'}>
                新增选项
              </Button>
            </Col>
          </Row>
          <Row>
            答案: <InputNumber min={1} max={10} />
          </Row>
          <Row>
            <Col span={3}>解析:</Col>
            <Col span={13}>
              <Input.TextArea placeholder={'专项说明文本（0/180）'} rows={8} />
            </Col>
          </Row>
        </div>

        <div className={styles.item2}>
          <Row>
            <Col span={6}>题目（2）:</Col>
            <Col span={18}>
              <Input placeholder={'Why did they punish Peter yesterday?'} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={14}>
              <Row>
                <Col span={4}>选项A:</Col>
                <Col span={20}>
                  <Input />
                </Col>
              </Row>
            </Col>

            <Col span={10}>
              <Row>
                <Col span={6}>or</Col>
                <Col span={8}>
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传图片
                      </Button>
                    </Upload>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={14}>
              <Row>
                <Col span={4}>选项B:</Col>
                <Col span={20}>
                  <Input />
                </Col>
              </Row>
            </Col>

            <Col span={10}>
              <Row>
                <Col span={6}>or</Col>
                <Col span={8}>
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传图片
                      </Button>
                    </Upload>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={14}>
              <Row>
                <Col span={4}>选项C:</Col>
                <Col span={20}>
                  <Input />
                </Col>
              </Row>
            </Col>

            <Col span={10}>
              <Row>
                <Col span={6}>or</Col>
                <Col span={8}>
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传图片
                      </Button>
                    </Upload>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Button type="primary" style={{ width: '100%' }} icon={'plus'}>
                新增选项
              </Button>
            </Col>
          </Row>
          <Row>
            答案: <InputNumber min={1} max={10} />
          </Row>
          <Row>
            <Col span={3}>解析:</Col>
            <Col span={11} style={{ mariginRight: 30 }}>
              <Input.TextArea placeholder={'专项说明文本（0/180）'} rows={8} />
            </Col>
            <Col span={8} style={{ mariginLeft: 30 }}>
              <Row style={{ textAlign: 'center' }}>
                <Button style={{ width: 120 }}>清空重新录入</Button>
              </Row>
              <Row style={{ textAlign: 'center' }}>
                <Button style={{ width: 120 }} type="primary">
                  确定试题
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  };

  renderNewSelectQs = (resources = []) => {
    const { editItem } = this.state;
    // debugger;
    return (
      <Fragment>
        <div className={styles.item1}>
          <Row>
            <Col span={6}>题目（1）:</Col>
            <Col span={18}>
              <Input placeholder={'Why did they punish Peter yesterday?'} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={14}>
              <Row>
                <Col span={4}>选项A:</Col>
                <Col span={20}>
                  <Input />
                </Col>
              </Row>
            </Col>

            <Col span={10}>
              <Row>
                <Col span={6}>or</Col>
                <Col span={8}>
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传图片
                      </Button>
                    </Upload>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={14}>
              <Row>
                <Col span={4}>选项B:</Col>
                <Col span={20}>
                  <Input />
                </Col>
              </Row>
            </Col>

            <Col span={10}>
              <Row>
                <Col span={6}>or</Col>
                <Col span={8}>
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传图片
                      </Button>
                    </Upload>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={14}>
              <Row>
                <Col span={4}>选项C:</Col>
                <Col span={20}>
                  <Input />
                </Col>
              </Row>
            </Col>

            <Col span={10}>
              <Row>
                <Col span={6}>or</Col>
                <Col span={8}>
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传图片
                      </Button>
                    </Upload>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Button type="primary" style={{ width: '100%' }} icon={'plus'}>
                新增选项
              </Button>
            </Col>
          </Row>
          <Row>
            答案: <InputNumber min={1} max={10} />
          </Row>
          <Row>
            <Col span={3}>解析:</Col>
            <Col span={13}>
              <Input.TextArea placeholder={'专项说明文本（0/180）'} rows={8} />
            </Col>
          </Row>
        </div>

        <div className={styles.item2}>
          <Row>
            <Col span={6}>题目（2）:</Col>
            <Col span={18}>
              <Input placeholder={'Why did they punish Peter yesterday?'} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={14}>
              <Row>
                <Col span={4}>选项A:</Col>
                <Col span={20}>
                  <Input />
                </Col>
              </Row>
            </Col>

            <Col span={10}>
              <Row>
                <Col span={6}>or</Col>
                <Col span={8}>
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传图片
                      </Button>
                    </Upload>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={14}>
              <Row>
                <Col span={4}>选项B:</Col>
                <Col span={20}>
                  <Input />
                </Col>
              </Row>
            </Col>

            <Col span={10}>
              <Row>
                <Col span={6}>or</Col>
                <Col span={8}>
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传图片
                      </Button>
                    </Upload>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={14}>
              <Row>
                <Col span={4}>选项C:</Col>
                <Col span={20}>
                  <Input />
                </Col>
              </Row>
            </Col>

            <Col span={10}>
              <Row>
                <Col span={6}>or</Col>
                <Col span={8}>
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传图片
                      </Button>
                    </Upload>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Button type="primary" style={{ width: '100%' }} icon={'plus'}>
                新增选项
              </Button>
            </Col>
          </Row>
          <Row>
            答案: <InputNumber min={1} max={10} />
          </Row>
          <Row>
            <Col span={3}>解析:</Col>
            <Col span={11} style={{ mariginRight: 30 }}>
              <Input.TextArea placeholder={'专项说明文本（0/180）'} rows={8} />
            </Col>
            <Col span={8} style={{ mariginLeft: 30 }}>
              <Row style={{ textAlign: 'center' }}>
                <Button style={{ width: 120 }}>清空重新录入</Button>
              </Row>
              <Row style={{ textAlign: 'center' }}>
                <Button style={{ width: 120 }} type="primary">
                  确定试题
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  };

  render() {
    const {
      form: { getFieldDecorator },
      examlist,
      operate,
    } = this.props;
    const { editItem, currentEditType, showEdit } = this.state;
    const { paperDetail } = examlist;
    const { specialList } = operate;
    // return <div>1</div>;
    return (
      <div className={styles.container}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/exam/list">试卷管理</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="#" style={{ color: '#1890FF', textDecoration: 'none' }}>
              {paperDetail.title}
            </a>
          </Breadcrumb.Item>
        </Breadcrumb>

        <Form layout="horizontal" className={styles.examForm}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item {...formItemLayout} label={'试卷名称'}>
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入名称，不超过18个字', max: 18 }],
                })(
                  <Input
                    placeholder="
                                因果题型训练                     
                                6/18"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 8 }}
                label="难度系数*（顶级5分）"
              >
                {getFieldDecorator('level', {
                  rules: [{ required: true, message: '请输入名称' }],
                  initialValue: 3,
                })(<InputNumber min={1} max={10} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item {...formItemLayout} label={'专项选择'}>
                <RadioGroup size="default" defaultValue={paperDetail.specialId}>
                  {/* <RadioButton value="b">仿真模拟练习</RadioButton>
                  <RadioButton value="c">历年真题闯关</RadioButton> */}
                  {specialList.map(item => {
                    return (
                      <RadioButton key={item.id} value={item.id}>
                        {item.title}
                        {paperDetail.specialId === item.id ? '' : null}
                      </RadioButton>
                    );
                  })}
                </RadioGroup>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item>
                <span style={{ marginRight: 20 }}>
                  试卷总分： {paperDetail.totalScore || '暂无'}
                </span>
                该试卷音频总长：{paperDetail.totalDuration || '暂无'}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Button type="primary" onClick={this.onSubmitExam}>
                提交试卷
              </Button>
            </Col>
          </Row>
        </Form>

        <Row gutter={24}>
          <Col lg={11} md={24}>
            <h2>试卷预览</h2>
            <div className={styles.examLeft}>
              {paperDetail.topics &&
                paperDetail.topics.map(item => (
                  <Card key={item.id} hoverable onClick={() => this.handleEdit(item)}>
                    {item.type === 1 ? (
                      <div key={item.id}>
                        <div className={styles.examTitle}>
                          <h2 style={{ float: 'left', marginRight: 11 }}>
                            {item.id}.({item.score}分)
                          </h2>
                          <div style={{ float: 'right' }}>
                            <a
                              href="#"
                              onClick={() => this.handleEdit(item)}
                              style={{ marginRight: 5 }}
                            >
                              编辑
                            </a>
                          </div>
                        </div>
                        {item.subTopics.map(subItem => {
                          return (
                            <div key={subItem.id}>
                              <h2>
                                （{subItem.topicNo}） .{subItem.title}
                              </h2>

                              {subItem.options.map(subOption => {
                                return (
                                  <div key={subOption.id}>
                                    <span> {subOption.topicNo}</span>
                                    <span> {subOption.answer}</span>
                                    <img src={subOption.image} />
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div key={item.id}>
                        <div className={styles.examTitle}>
                          <h2 style={{ float: 'left', marginRight: 11 }}>
                            {item.id}.({item.score}分)
                          </h2>
                          <div style={{ float: 'right' }}>
                            <a
                              href="#"
                              onClick={() => this.handleEdit(item)}
                              style={{ marginRight: 5 }}
                            >
                              编辑
                            </a>
                          </div>
                        </div>
                        {item.subTopics.map(subItem => {
                          return (
                            <div key={subItem.id}>
                              <h2>
                                {subItem.id} .{subItem.title}
                              </h2>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </Card>
                ))}
            </div>
          </Col>

          <Col lg={12} md={24}>
            <h2>编辑题目{}</h2>
            <div className={styles.examRight}>
              <Form onSubmit={this.handleSubmit}>
                {/* <Row>
                                    <Col span={12}>

                                        <Form.Item
                                            label="专项名称"
                                            labelCol={{ span: 5 }}
                                            wrapperCol={{ span: 17 }}
                                        >
                                            {getFieldDecorator('note', {
                                                rules: [{ required: true, message: 'Please input your note!' }],
                                            })(
                                                <Input placeholder={'专项训练名称（不超过10个字）'} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row> */}
                <Row>
                  <Form.Item label="题型选择" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                    <RadioGroup
                      onChange={this.onChangeExamType}
                      size="default"
                      defaultValue={currentEditType}
                    >
                      <RadioButton value={1}>选择</RadioButton>
                      <RadioButton value={2}>段落填空</RadioButton>
                    </RadioGroup>
                  </Form.Item>
                </Row>
                <div>
                  <Row>
                    <Col span={8}>
                      <span>上传音频: {(editItem && editItem.audio) || ''}</span>
                    </Col>
                    <Col span={8}>
                      <span>该音频时长: {(editItem && editItem.audioDuration) || ''}</span>
                    </Col>
                    <Col span={3}>
                      <Upload {...props}>
                        <Button style={{ marginLeft: 60 }}>
                          <Icon type="upload" /> 重新上传
                        </Button>
                      </Upload>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label="该音频下的题目数"
                        labelCol={{ span: 15 }}
                        wrapperCol={{ span: 2 }}
                      >
                        {getFieldDecorator('note', {
                          rules: [{ required: true, message: 'Please input your note!' }],
                        })(<InputNumber min={1} max={10} />)}
                      </Form.Item>
                    </Col>

                    <Col span={10}>
                      <Form.Item label="每题分数" labelCol={{ span: 10 }} wrapperCol={{ span: 3 }}>
                        {getFieldDecorator('note', {
                          rules: [{ required: true, message: 'Please input your note!' }],
                        })(<InputNumber min={1} max={10} />)}
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item
                        wrapperCol={{
                          xs: { span: 24, offset: 0 },
                          sm: { span: 16, offset: 8 },
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          确认
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                {showEdit && editItem.type == 1 ? this.renderSelectQs() : ''}
                {showEdit && editItem.type == 2 ? this.renderSelectP() : ''}

                {currentEditType === 1 && !showEdit ? this.renderNewSelectQs() : ''}
                {currentEditType === 2 && !showEdit ? this.renderNewSelectP() : ''}
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewExam;
