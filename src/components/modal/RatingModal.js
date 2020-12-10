import React, { useState } from "react";
import { Modal} from "antd";

import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
//so we can use history 
import { useHistory,useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();
  let params=useParams();
  

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname:'/login',
        state:{from:`/product/${params.slug}`}
      });
      //grab dynamic slug. NOTE the params.slug 's slug is because in app.js 's route parameter you wrote "/product/:slug"
      
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating/Update your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
