import Gallery from 'react-grid-gallery';
import Page from '../../components/page';
import Layout from '../../components/layout';
import AsyncData from '../../components/async-data';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const getPicsumAPIUrl = (page=0, limit=100) => { return `https://picsum.photos/v2/list?page=${page}&limit=${limit}`; }

const processImages = (photos) => {
  return photos.map((photo) => {
    return {
      src: photo.download_url,
      thumbnail: `https://picsum.photos/id/${photo.id}/367/267`,
      thumbnailWidth: 367,
      thumbnailHeight: 267,
      caption: photo.author
    }
  });
}

export default class extends Page {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      photos: this.props.photos
    };
  }

  static async getInitialProps({ req }) {
    const data = await AsyncData.getData(getPicsumAPIUrl());
    return {
      photos: processImages(data)
    }
  }

  async handleClick(e, index) {
    e.preventDefault();
    const data = await AsyncData.getData(getPicsumAPIUrl(index));
    this.setState({
      currentPage: index,
      photos: processImages(data)
    });
  }

  render() {
    const { currentPage } = this.state;
    return (
      <Layout {...this.props} title="Gallery">
        <h1 className="display-2">Gallery</h1>
        <p className="lead">
          This project uses both a custom Page class and a Layout component.
        </p>
        <div style={{
          display: "block",
          minHeight: "1px",
          width: "100%",
          border: "1px solid #fff",
          overflow: "auto"
        }}>
          <Gallery images={this.state.photos} enableImageSelection={false} />
        </div>
        <div className="pagination-wrapper">
          <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage - 1)}
                previous
                href="#"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage + 1)}
                next
                href="#"
              />
            </PaginationItem>
          </Pagination>
        </div>
      </Layout>
    )
  }
}
