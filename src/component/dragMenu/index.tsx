import React, { ReactNode, useEffect } from 'react';
import Icon from '@/component/icon';
import './index.scss';
import { ViewListPositionData } from '../dragView/view';
import { AttributeFormList } from '../dragAttribute/attributeForm';

type MenuClickFunc = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  item: DragMenuListData,
  index: number
) => void;

type DragMenuParam = {
  title?: string;
  list: DragMenuListData[];
  handleClick?: MenuClickFunc;
  currentIndex?: number;
};

type DragMenuListParam = {
  list: DragMenuListData[];
  handleClick: MenuClickFunc;
  currentIndex?: number;
};

export type styleData = {
  key: keyof React.CSSProperties;
  value: string;
  title: string;
  type: 'input' | 'color' | 'swipe' | 'image' | 'precent';
};

export type DragMenuElementFunc = (
  style: styleData[],
  attributes?: Record<string, any>
) => React.FunctionComponentElement<any>;

/** 菜单栏列表数据 */
export type DragMenuListData = {
  key: string;
  name: string;
  icon: string | ReactNode;
  element: DragMenuElementFunc;
  style?: styleData[];
  position?: ViewListPositionData;
  attributes?: AttributeFormList[];
};

function MenuList({ list, handleClick, currentIndex }: DragMenuListParam) {
  return (
    <>
      {list.map((val, index) => {
        const columnClass =
          currentIndex === index
            ? 'drag_menu_list_column drag_menu_list_column_active'
            : 'drag_menu_list_column';
        return (
          <div
            className={columnClass}
            key={val.key}
            onMouseDown={(e) => handleClick(e, val, index)}
          >
            {typeof val.icon === 'string' ? <Icon type={val.icon} /> : val.icon}
            <p>{val.name}</p>
          </div>
        );
      })}
    </>
  );
}

/** 菜单栏 */
function DragMenu({
  title = 'Menu List',
  list,
  handleClick = () => {},
  currentIndex = -1,
}: DragMenuParam) {
  return (
    <section className='drag_menu'>
      <h3 className='drag_menu_title'>{title}</h3>
      <div className='drag_menu_list'>
        <MenuList
          list={list}
          handleClick={handleClick}
          currentIndex={currentIndex}
        />
      </div>
    </section>
  );
}

export default DragMenu;
