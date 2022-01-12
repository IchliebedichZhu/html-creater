import { DragMenuListData } from '@/component/dragMenu';
import { cloneElement, useMemo } from 'react';
import './index.scss';

type ScreenViewParam = {
  containerId: string;
  width?: number;
  height?: number;
  viewList?: DragMenuListData[];
};

function ScreenView({
  containerId,
  width = 375,
  height = 667,
  viewList,
}: ScreenViewParam) {
  return (
    <section id={containerId} className='screen_view' style={{ width, height }}>
      {viewList?.map((val, index) => (
        <div key={`${val.key}_${index}`}>{val.element(val.style || {})}</div>
      ))}
    </section>
  );
}

export default ScreenView;
