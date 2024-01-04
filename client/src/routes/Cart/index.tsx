import React, { PropsWithChildren, useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, StaticContext } from "react-router";
import { useParams, useLocation } from "react-router-dom";
import { CombinedState, Lesson, CartState, CartItem } from "@/typings";
import "./index.less";
import mapDispatchToProps from "@/store/action/cart";
import NavHeader from "@/components/NavHeader";
import {
  Card,
  Table,
  Button,
  InputNumber,
  Popconfirm,
  Row,
  Col,
  Badge,
  Modal,
} from "antd";
import { getLesson } from "@/api/home";
interface Params {
  id: string;
}
// interface StaticContext {
// statusCode?: number | undefined;
// }
type Props = PropsWithChildren<
  RouteComponentProps<Params, StaticContext, Lesson> &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>;

function Cart(props: Props) {
  let [settleVisible, setSettleVisible] = useState(false);
  const confirmSettle = () => {
    setSettleVisible(true);
  };
  const handleOk = () => {
    setSettleVisible(false);
    props.settle();
  };
  const handleCancel = () => {
    setSettleVisible(false);
  };
  const columns = [
    {
      title: "商品",
      dataIndex: "lesson",
      render: (val: Lesson, row: CartItem) => (
        <>
          <p>{val.title}</p>
          <p>单价:{val.price}</p>
        </>
      ),
    },
    {
      title: "数量",
      dataIndex: "count",
      render: (val: number, row: CartItem) => (
        <InputNumber
          size="small"
          min={1}
          max={10}
          value={val}
          onChange={(value) => props.changeCartItemCount(row.lesson.id, value)}
        />
      ),
    },
    {
      title: "操作",
      render: (val: any, row: CartItem) => (
        <Popconfirm
          title="是否要删除商品?"
          onConfirm={() => props.removeCartItem(row.lesson.id)}
          okText="是"
          cancelText="否"
        >
          <Button size="small" danger>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const rowSelection = {
    selectedRowKeys: props.cart
      .filter((item: CartItem) => item.checked)
      .map((item: CartItem) => item.lesson.id),
    onChange: (selectedRowKeys: string[]) => {
      props.changeCheckedCartItems(selectedRowKeys);
    },
  };
  let totalCount: number = props.cart
    .filter((item: CartItem) => item.checked)
    .reduce((total: number, item: CartItem) => total + item.count, 0);
  let totalPrice = props.cart
    .filter((item: CartItem) => item.checked)
    .reduce(
      (total: number, item: CartItem) =>
        total +
        Number(item.lesson.price.slice(1, item.lesson.price.length - 1)) *
          item.count,
      0
    );
  return (
    <>
      <NavHeader history={props.history}>购物车</NavHeader>
      <Table
        rowKey={(row) => row.lesson.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props.cart}
        pagination={false}
        size="small"
      />
      <Row style={{ padding: "5px" }}>
        <Col span={4}>
          <Button danger size="small" onClick={props.clearCartItems}>
            清空
          </Button>
        </Col>
        <Col span={9}>
          已经选择{totalCount > 0 ? <Badge count={totalCount} /> : 0}件商品
        </Col>
        <Col span={7}>总价: ¥{totalPrice}元</Col>
        <Col span={4}>
          <Button danger size="small" onClick={confirmSettle}>
            去结算
          </Button>
        </Col>
      </Row>
      <Modal
        title="去结算"
        open={settleVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>请问你是否要结算?</p>
      </Modal>
    </>
  );
}
const mapStateToProps = (state: CombinedState): { cart: CartState } => ({
  cart: state.cart,
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
