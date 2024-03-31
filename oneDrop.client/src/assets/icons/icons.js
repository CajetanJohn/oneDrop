// SVGIcons.js
import React from 'react';

// Import your SVG files
import { ReactComponent as CalendarIcon } from './calendar-event.svg';
import { ReactComponent as ListIcon } from './card-list.svg';
import { ReactComponent as MenuIcon } from './menu-button.svg';
import { ReactComponent as QrCodeIcon } from './qr-code-scan.svg';
import { ReactComponent as SearchIcon } from './search.svg';
import { ReactComponent as List } from './card-list.svg';
import { ReactComponent as Ticket } from './ticket-detailed.svg';
import { ReactComponent as Plus } from './plus.svg';
import { ReactComponent as CalendarActive } from './calender-active.svg';
import { ReactComponent as ListActive } from './list-active.svg';
import { ReactComponent as QrCodeActive } from './qrcode-active.svg';
import { ReactComponent as SearchActive } from './search-active.svg';
import { ReactComponent as Show } from './eye.svg';
import { ReactComponent as Hide } from './eye-slash.svg';
import { ReactComponent as Left } from './chevron-left.svg';


const icons = {
  calendar: CalendarIcon,
  another: ListIcon,
  menu_button: MenuIcon,
  qr_code: QrCodeIcon,
  search: SearchIcon,
  list: List,
  create: Plus,
  tickets: Ticket,
  calendarActive: CalendarActive,
  listActive: ListActive,
  qr_codeActive: QrCodeActive,
  searchActive: SearchActive,
  show: Show,
  hide:Hide,
  left:Left,

};

const Icon = ({ name, onClick, ...rest }) => {
  const IconComponent = icons[name];
  
  if (!IconComponent) {
    console.error(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent width='24px' height='24px' className='icon' {...rest} onClick={(e)=>onClick(e)} fill="var(--txtc)" />;
};

export default Icon;
