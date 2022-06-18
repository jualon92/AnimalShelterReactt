import { Component } from "react";
import { useParams } from "react-router-dom";
import { Client } from "@petfinder/petfinder-js";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";
import Carousel from "./Carousel";

const client = new Client({ // could be an static class 
  apiKey: "5rfxmXrtQSMZJWLanVnXwoZSQJUq5a3Wp52hDEUJAuA074M6Ms",
  secret: "svUHB64pldK5RmJhyLR5ODDBlxpm9cavueQ6RtoZ",
});

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const resp = await client.animal.search()
    const animals = resp.data.animals
    console.log(animals, this.props.params.id)
    const json = animals.filter(ele => ele.id == this.props.params.id )
    console.log(json, json[0])
    this.setState(Object.assign({ loading: false }, json[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { type, breeds, contact, state, description, name, photos, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={photos} />
        <div>
          <h1>{name}</h1>
          <h2>{`${type} — ${breeds.primary} — ${contact.address.city}, ${contact.address.state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return <Details params={params} />;
};

export default WrappedDetails;

/*import { useParams } from "react-router-dom";
const Details = () => {
  const { id } = useParams(); //acess key pair value of router param
  return (<h2>{id}</h2>);
};

export default Details;*/
