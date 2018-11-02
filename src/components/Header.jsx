import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "./../img/logo-pipipol_black.png";
import AuthService from '../services/AuthService';
const Auth = new AuthService();

const BaseURL = "http://pipipol.btoz.co.id";

class Header extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      categories: [],
      loading: true
    };
  }

  componentDidMount = async () => {
    const api_get_categories = await fetch(BaseURL + "/api/getKategori");
    const data = await api_get_categories.json();
    this.setState({ categories: data.list_kategori, loading: false });
    // console.log(this.state.categories);

    this.setState({
      userDetails: JSON.parse(localStorage.getItem('userDetails'))
    })
    console.log("HEADER - USERDETAILS LOCALSTORAGE")
    console.log(this.state.userDetails)
  };

  handleLogout(){
    Auth.logout()
  }

  isLoggedIn() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  render() {

    const userDetails = this.state.userDetails;
    
    const categories = this.state.categories;
    const listCategories = categories.map(cat => (
      <option key={cat.id} value={cat.id}>
        {cat.cat_name}
      </option>
    ));

    if(this.isLoggedIn()){
      return (
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-tr">
            <NavLink to="/" className="navbar-brand">
              <img src={logo} alt="" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar"
              aria-controls="navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a
                    href="#pollToolbar"
                    className="nav-link"
                    data-toggle="collapse"
                    role="button"
                    aria-expanded="false"
                    aria-controls="pollToolbar"
                  >
                    <i className="fas fa-search" />
                  </a>
                </li>
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Polling
                  </NavLink>
                </li>
                <li className="nav-item hide">
                  <NavLink to="/test" className="nav-link">
                    Test
                  </NavLink>
                </li>
                <li className="nav-item nav-profile dropdown">
                  <NavLink to="/profil" className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    <div
                      className="avatar"
                      style={{
                        backgroundImage: "url("+BaseURL+userDetails.avatar+")" 
                      }}
                    />
                    <strong>{ userDetails.point } { !userDetails.point && 0 }</strong> poin <i className="fas fa-angle-down ml-1"></i>
                  </NavLink>
                  <div className="dropdown-menu">
                    <NavLink to="/profil" className="dropdown-item" href="#">
                      <i className="fas fa-id-card mr-1"></i> Profil
                    </NavLink>
                    <NavLink to="/login" onClick={this.handleLogout.bind(this)} className="dropdown-item">
                      <i className="fas fa-sign-out-alt mr-1"></i> Logout 
                    </NavLink>
                  </div>
                </li>
                <li className="nav-item nav-redeem">
                  <NavLink to="/redeem" className="nav-link">
                    Redeem
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>

          <div id="pollToolbar" className="poll-toolbar collapse">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-sm-12">
                  <div className="input-group mt-3">
                    <select className="custom-select" id="inputGroupSelect01">
                      {listCategories}
                    </select>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div className="row">
                    <div className="col-6">
                      <NavLink
                        to="#"
                        className="btn btn-red mb-3 mt-3"
                        href="#"
                        role="button"
                      >
                        Populer
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink
                        to="#"
                        className="btn btn-outline mb-3 mt-3"
                        href="#"
                        role="button"
                      >
                        Terbaru
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      console.log("KELUAAAAARRRRRRR")
      return (
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-tr">
            <NavLink to="/" className="navbar-brand">
              <img src={logo} alt="" />
            </NavLink>

            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item nav-redeem">
                  <NavLink to="/login" className="nav-link">
                    <i className="fas fa-lock mr-1" /> Login
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
}

export default Header;
