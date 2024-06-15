import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'

import './Sidebar.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<PropsWithChildren<SidebarProps>> = props => {
  const { className = '', children } = props
  return <aside className={classNames('sidebar', className)}>{children}</aside>
}
