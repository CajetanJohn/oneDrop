import React from 'react';
import PropTypes from 'prop-types';

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
import { ReactComponent as Trash } from './trash3.svg';
import { ReactComponent as GraphUp } from './graph-up-arrow.svg';
import { ReactComponent as Money } from './cash-coin.svg';
import { ReactComponent as Sort_Des } from './sort-numeric-down-alt.svg';
import { ReactComponent as Sort_Asc } from './sort-numeric-down.svg';
import { ReactComponent as Close } from './x.svg';


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
  hide: Hide,
  left: Left,
  trash: Trash,
  graph_up: GraphUp,
  money: Money,
  ascending:Sort_Asc,
  descending:Sort_Des,
  close:Close,
};

const Icon = ({ name, onClick, fill, size, children, ...rest }) => {
  const IconComponent = icons[name];
  
  if (!IconComponent) {
    console.error(`Icon "${name}" not found`);
    return null;
  }

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const iconStyle = {
    width: size || '22px',
    height: size || '22px',
    fill: fill || 'var(--txtc)',
    filter: children ? 'blur(.4px)' : 'none', // Apply blur effect only when children are present
  };

  const containerStyle = {
    position: 'relative', // Set position relative for absolute positioning of children
    display: 'inline-block',
    fontSize: size || '0.6rem',
    color: 'var(--txtc)',
    fontWeight:'700',
  };

  const childrenStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: size || '22px', // Set width and height to match icon
    height: size || '22px',
    display: 'grid',
    placeItems: 'center',
    fontSize:".6rem",
  };

  return (
    <div style={containerStyle}>
      <IconComponent
        className='icon'
        {...rest}
        onClick={handleClick}
        style={iconStyle}
      />
      {children && <div style={childrenStyle}>{children}</div>}
    </div>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  fill: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node, // Children prop for text or other elements
};

Icon.defaultProps = {
  fill: 'var(--txtc)',
  size: '22px',
};

export default Icon;
