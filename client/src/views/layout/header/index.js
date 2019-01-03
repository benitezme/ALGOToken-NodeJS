import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withWidth from '@material-ui/core/withWidth'

import AALogo from '../../../assets/advanced-algos/aa-logo.svg'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      onTop: true,
      mobileOpen: false,
      openedMenu: null,
      user: null
    }
  }

  handleScroll () {
    if (window.pageYOffset > 0) {
      this.setState({ onTop: false })
    } else {
      this.setState({ onTop: true })
    }
  }

  scrollToTop () {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  toggleMobileOpen () {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  toggleMenuOpen (index, allowed) {
    if (allowed) {
      if (this.state.openedMenu === index) {
        this.setState({ openedMenu: null })
      } else {
        this.setState({ openedMenu: index })
      }
    }
  }

  mouseLeave (allowed) {
    if (allowed) {
      this.setState({ openedMenu: null })
    }
  }

  closeAll () {
    this.setState({ openedMenu: null, mobileOpen: false })
  }

  componentDidMount () {
    window.addEventListener('scroll', () => this.handleScroll())
    const user = window.localStorage.getItem('user')
    this.setState({ user })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', () => this.handleScroll())
  }

  render () {
    let { onTop, mobileOpen } = this.state

    return (
      <React.Fragment>
        <header className={onTop ? 'menu' : 'menu notOnTop'}>
          <div className='container'>
            <Link to='/'>
              {' '}
              <img className='logo' src={AALogo} alt='Advanced Algos' />{' '}
            </Link>
            <div
              className={mobileOpen ? 'mobileHandle openedMobile' : 'mobileHandle'}
              onClick={() => this.toggleMobileOpen()}
            >
              Menu
            </div>
            <nav className={mobileOpen ? 'links openedMobile' : 'links'}>
              <ul className='primaryMenu'>
                <li className='primaryLink'>
                  <Link to='/'> Home </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {onTop ? (
          ''
        ) : (
          <div
            className='toTop'
            onClick={() => {
              this.scrollToTop()
            }}
          />
        )}
      </React.Fragment>
    )
  }
}

export default withWidth()(Header)
