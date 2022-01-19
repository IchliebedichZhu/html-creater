import { DragMenuListData } from '@/component/dragMenu';
import { useEffect, useState } from 'react';
import './index.scss';

type ScreenViewParam = {
  containerId: string;
  width?: number;
  height?: number;
  viewList?: DragMenuListData[];
  handleClick?: handleViewItemFunc;
  handleGetList?: (data: ViewListPositionData[]) => void;
};

export type HandleViewChangeFunc = (data: ViewListPositionData[]) => void;

export type ViewListPositionData = {
  x: number;
  y: number;
};

export type handleViewItemFunc = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  item: DragMenuListData,
  index: number
) => void;

function ScreenView({
  containerId,
  width = 375,
  height = 667,
  viewList,
  handleClick = () => {},
  handleGetList = () => {},
}: ScreenViewParam) {
  const [isDrag, setIsDrag] = useState(false);
  useEffect(() => {
    const positionArr: ViewListPositionData[] = [];
    const parent = document.querySelector(`#${containerId}`);
    if (parent && parent.childNodes && parent.childNodes.length > 0) {
      parent.childNodes.forEach((val) => {
        const boundingClientRect = (val as HTMLElement).getBoundingClientRect();
        const top = boundingClientRect.top;
        const left = boundingClientRect.left;
        positionArr.push({ x: left, y: top + boundingClientRect.height });
      });
      handleGetList(positionArr);
    }
  }, [viewList]);
  return (
    <section
      id={containerId}
      className='screen_view'
      style={{ width, height }}
      onClick={(e) => {}}
    >
      {viewList?.map((val, index) => (
        <div
          key={`${val.key}_${index}`}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDrag(true);
            handleClick(e, val, index);
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            setIsDrag(false);
          }}
        >
          {val.element(val.style || {})}
        </div>
      ))}
    </section>
  );
}

export default ScreenView;
