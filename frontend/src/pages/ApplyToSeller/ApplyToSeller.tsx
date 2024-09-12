import React, { useEffect, useState } from "react";
import backarrow from "../../assets/back-arrow.png";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./ApplyToSeller.css"
import { Button, Form, Row, Col, Input, Select, Card, Flex, message, Upload, GetProp, UploadProps, UploadFile } from "antd";
import { YearsInterface } from "../../interfaces/Years";
import { CreateSeller, GetInstituteOf, GetYear } from "../../https";
import { SellerInterface } from "../../interfaces/Seller";
import { InstituteOfInterface } from "../../interfaces/InstituteOf";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const { Option } = Select;

function ApplyToSeller() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [years, setYears] = useState<YearsInterface[]>([]);
  const [instituteof, setinstituteof] = useState<InstituteOfInterface[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values: SellerInterface) => {
    values.PictureStudentID = fileList[0].thumbUrl;
    const res = await CreateSeller(values);
    console.log(res);
    if (res) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/SellerHome");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
  };

  const getyear = async () => {
    const res = await GetYear();
    if (res) {
      setYears(res);
    }
  };

  useEffect(() => {
    getyear();
  }, []);

  const getinstituteof = async () => {
    const res = await GetInstituteOf();
    if (res) {
      setinstituteof(res);
    }
  };

  useEffect(() => {
    getinstituteof();
  }, []);


  const handleBacktoHome = () => {
    navigate('/');
  };

  // const OpenSellerHome = () => {
  //   navigate('/SellerHome');
  // };

  return (
    <div>
    <Flex>
      {/* {contextHolder} */}
      <Card         
        style={{
          borderRadius: "12px",
          padding: "24px",
          background: "#e2dfdf",
          width:"1100px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24} style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
                marginTop:"-80px"
              }}
            >
              <img
                src={Logo}
                alt="Course Logo"
                style={{
                  width: "200px",
                  marginRight: "20px",
                  marginTop:"0"
                }}
              />
              <h2 
                style={{ 
                  margin: "0 70px",
                }}>
                กรอกข้อมูลเพิ่มเติมสำหรับการยืนยันตัวตน
              </h2>
              <img
                src={backarrow}
                alt="backarrow"
                onClick={handleBacktoHome}
                style={{
                  width: "40px",
                  cursor: "pointer",
                  marginLeft: "130px",
                }}
              />
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]} justify="center" 
          style={{
            marginTop:"-40px"
          }}>       
          <Form layout="vertical" 
            onFinish={onFinish}
            style={{ 
              width: '400px' 
              }}>
            <Form.Item             
                label="รหัสนักศึกษา"
                name="StudentID"
                rules={[{ required: true, message: "กรุณากรอกรหัสนักศึกษา!" }]}
                style={{ marginBottom: "16px" }}>
              <Input placeholder="รหัสนักศึกษา" size="large" />
            </Form.Item>

            <Form.Item 
                label="ชั้นปี"
                name="Year"
                rules={[{ required: true, message: "กรุณาเลือกชั้นปี!" }]}
                style={{ marginBottom: "16px" }}>
                  <Select placeholder="เลือกชั้นปี" size="large">
                    {years.map((item) => (
                      <Option value={item.ID} key={item.Name}>
                        {item.Name}
                      </Option>
                    ))}
                  </Select>
            </Form.Item>

            <Form.Item 
                label="สำนักวิชา"
                name="Faculty"
                rules={[{ required: true, message: "กรุณาเลือกสำนักวิชา!" }]}
                style={{ marginBottom: "16px" }}>
                  <Select placeholder="เลือกสำนักวิชา" size="large">
                    {instituteof.map((item) => (
                        <Option value={item.ID} key={item.NameInstituteOf}>
                          {item.NameInstituteOf}
                        </Option>
                      ))}
                  </Select>
            </Form.Item >

            <Form.Item            
              label="สาขา"
              name="Major"
              rules={[{ required: true, message: "กรุณาเลือกสาขา!" }]}
              style={{ marginBottom: "16px" }}>
                <Input placeholder="เลือกสาขา" size="large">
                </Input>
            </Form.Item>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="รูปบัตรนักศึกษา"
                name="Profile"
                valuePropName="fileList"
                style={{
                  marginLeft:"-9px"
                }}
              >
                <ImgCrop rotationSlider>
                  <Upload
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={(file) => {
                      setFileList([...fileList, file]);
                      return false;
                    }}
                    maxCount={1}
                    multiple={false}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture"
                  >
                    <Button type="primary" icon={<UploadOutlined />} 
                      style={{
                        backgroundColor: "#212020", // สีพื้นหลัง
                        borderColor: "#181818",     // สีขอบ
                        color: "#fff",              // สีข้อความ
                      }}>
                      Upload
                    </Button>
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Col>
{/* 
            <Form.Item           
              label="รูปบัตรนักศึกษา"
              name="StudentCard"
              rules={[{ required: true, message: "กรุณาอัปโหลดรูปบัตรนักศึกษา!" }]}
              style={{ marginBottom: "16px" }}>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture"
                defaultFileList={fileList}
              >
                <Button type="primary" icon={<UploadOutlined />} 
                  style={{
                    backgroundColor: "#212020", // สีพื้นหลัง
                    borderColor: "#181818",     // สีขอบ
                    color: "#fff",              // สีข้อความ
                  }}>
                  Upload
                </Button>
              </Upload>
            </Form.Item> */}

            <Row justify="center">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                // onClick={OpenSellerHome}
                style={{
                  backgroundColor: "#33ca0d",
                  borderColor: "#33ca0d",
                  borderRadius: "8px",
                  padding: "0 60px",
                  marginTop:"-55px",
                  marginLeft:"750px",
                }}
              >
                ยืนยัน
              </Button>
            </Row>
          </Form>
        </Row> 
      </Card>
    </Flex>
    </div>
  );
};

export default ApplyToSeller;


