import MainTemplate from '@/template/mainTemplate';
import DragMenu, { DragMenuListData } from '@/component/dragMenu';
import DragAttribute from '@/component/dragAttribute';
import { Col, Row } from 'antd';
import './index.scss';
import DragView, { viewContainerId } from '@/component/dragView';
import { useEffect, useState } from 'react';
import {
  checkIsInContainer,
  handleMenuClick,
  handleMouseMove,
  handleMouseUp,
  InitTempBox,
} from './methods';
import { useMouseMove, useMouseUp } from '@/hooks/mouseEvent';
import { deepClone } from '@/utils';
import { ViewListPositionData } from '@/component/dragView/view';
import { MENU_LIST, VIEW_MENU_TAB_LIST } from '@/data/menu';
import { useDragMethod } from '@/hooks/drag';

function Main() {
  let [viewList, setViewList] = useState<DragMenuListData[]>([]);
  const {
    handleDragMove,
    handleDragUp,
    handleViewClick,
    handleViewRender,
    getContainerPostion,
  } = useDragMethod();
  useEffect(() => {
    InitTempBox();
    useMouseMove((e) => {
      // 获取当前鼠标移动到的位置
      const insertIndex = handleMouseMove(e, getContainerPostion());
      const containViewList = handleDragMove(e, insertIndex);
      if (containViewList) setViewList([...containViewList]);
    });
    useMouseUp(() => {
      handleMouseUp();
      handleDragUp();
    });
  }, []);
  return (
    <MainTemplate>
      <Row className='main_row'>
        <Col span={6}>
          <DragMenu
            list={MENU_LIST}
            handleClick={(e, item) => {
              handleMenuClick(e, item);
              handleViewClick(item, -1, true);
            }}
          />
        </Col>
        <Col className='draw_view_main' span={12}>
          <DragView
            tabMenu={VIEW_MENU_TAB_LIST}
            viewList={viewList}
            handleClick={(e, item, index) => {
              handleMenuClick(e, item);
              handleViewClick(item, index, false);
            }}
            handleViewChange={(positionList) => {
              const containViewList = handleViewRender(positionList);
              setViewList(containViewList);
            }}
          />
        </Col>
        <Col span={6}>
          <DragAttribute />
        </Col>
      </Row>
    </MainTemplate>
  );
}

export default Main;
