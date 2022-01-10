import { PageHeader, Image } from 'antd';
import HTML_ICON from '@/assets/icon/html.svg';
import './index.scss';
import { ReactNode } from 'react';

/** 主函数参数 */
type MainTemplateParam = {
  children?: ReactNode;
};

/** 头部参数 */
type HeaderTitleParam = {
  title: string;
};

function HeaderTitle({ title }: HeaderTitleParam) {
  return (
    <div className='main_template_header_title'>
      <Image
        className='main_template_header_title_image'
        src={HTML_ICON}
        preview={false}
      />
      <p className='main_template_header_title_text'>{title}</p>
    </div>
  );
}

function MainTemplate({ children }: MainTemplateParam) {
  return (
    <>
      <PageHeader
        className='main_template_header'
        backIcon={false}
        title={<HeaderTitle title='html-creater' />}
      />
      <div className='main_template_container'>{children}</div>
    </>
  );
}

export default MainTemplate;
