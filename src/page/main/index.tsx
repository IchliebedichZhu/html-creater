import MainTemplate from '@/template/mainTemplate';
import DragMenu, { DragMenuListData } from '@/component/dragMenu';
import DragAttribute from '@/component/dragAttribute';
import { Col, Row } from 'antd';
import './index.scss';
import DragView, { TabListData } from '@/component/dragView';

const menuList: DragMenuListData[] = [
  {
    key: 'form',
    name: 'form',
    icon: 'form',
  },
];

const viewList: TabListData[] = [
  {
    key: 'view',
    name: 'View',
  },
  {
    key: 'code',
    name: 'Code',
  },
];

function Main() {
  return (
    <MainTemplate>
      <Row className='main_row'>
        <Col span={6}>
          <DragMenu list={menuList} />
        </Col>
        <Col className='draw_view_main' span={12}>
          <DragView list={viewList} />
        </Col>
        <Col span={6}>
          <DragAttribute />
        </Col>
      </Row>
    </MainTemplate>
  );
}

export default Main;
