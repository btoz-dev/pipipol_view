import React, { Component } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import Header from "../components/Header"
import Pollings from "./Pollings";
import Feed from "./Feed";

const BaseURL = "http://pipipol.btoz.co.id";

class Home extends Component {
  state = {
    pollings: [],
    firstpoll: [],
    loading: true
  };
  componentDidMount = async () => {
    // const title = this.props.location.state.recipe;
    const api_get_polls = await fetch(BaseURL + "/api/getPolls");

    const data = await api_get_polls.json();
    const datafirst = data.list_polls[0];
    this.setState({ pollings: data.list_polls, loading: false });
    this.setState({ firstpoll: datafirst });
    console.log("ALL POLLINGS =============")
    console.log(this.state.pollings);
  };

  render() {
    const firstpoll = this.state.firstpoll;
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    }

    return (
      <div>
        <Header />
      <div className="site-content">
        <div className="bg-container">
          <div className="poll-grids container-fluid">
            <div className="row no-gutters">
              <div className="col-md-5 col-sm-12">
                {/* POLL FEATURED */}
                {/* <FeaturedPolling firstpoll={this.state.firstpoll} /> */}
                <div
                  className="poll-card featured"
                  style={{
                    backgroundImage:
                      "url(http://pipipol.btoz.co.id" + firstpoll.image + ")"
                  }}
                >
                  <div className="poll-overlay" />
                  <div className="poll-content">
                    <div className="poll-category btn btn-outline">
                      {firstpoll.kategori}
                    </div>
                    <div className="poll-copy">
                      <h1>{firstpoll.title}</h1>
                      <p>{firstpoll.question}</p>
                    </div>
                    <div className="poll-exp-date">
                      <i className="far fa-calendar">
                        <span>{firstpoll.expired}</span>
                      </i>hari lagi
                    </div>
                    <div className="poll-value-point">
                      <span className="value">{firstpoll.point}</span>{" "}
                      <small>poin</small>
                    </div>
                  </div>
                  <Link
                    to={{
                      pathname: `/polling/${firstpoll.slug}`,
                      state: { polling: firstpoll.polls_id }
                    }}
                    className="poll-btn-quickview"
                  >
                    <i className="fas fa-search-plus" />
                  </Link>
                </div>
                {/*/END POLL FEATURED  */}
              </div>
              <div className="col-md-7 col-sm-12">
                {/* ALL POLLS */}
                <Pollings pollings={this.state.pollings} BaseURL={BaseURL} />
                {/* /END ALL POLLS */}
              </div>
            </div>
          </div>
        </div>

        {/* ALL POLLS CARD */}

        <div className="poll-grids-container">
          <div className="poll-grids-title">
            <h2 className="text-center">Polling terbaru lainnya</h2>
          </div>
          <div className="poll-grids container-fluid">
            <Feed />
          </div>
        </div>

        {/* <Form getPolling={this.getPolling} /> */}
      </div>
      </div>
    );
  }
}

export default Home;
