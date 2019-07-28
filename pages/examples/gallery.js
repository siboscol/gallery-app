import Gallery from 'react-grid-gallery';
import Page from '../../components/page';
import Layout from '../../components/layout';
import AsyncData, { getOrigin } from '../../components/async-data';
import { handleAuthSSR } from '../../components/auth';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const getPicsumAPIUrl = (page = 0, limit = 100) => { return `/api/photos?page=${page}&limit=${limit}`; }
const processImages = (photos) => {
  return photos.map((photo) => {
    return {
      src: photo.download_url,
      thumbnail: `/api/photos/${photo.id}`,
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

  static async getInitialProps(ctx) {
    // Validate JWT before rendering page
    // If the JWT is invalid it must redirect back to the main page.
    const username = await handleAuthSSR(ctx);
    const data = await AsyncData.getData(getOrigin(ctx.req) + getPicsumAPIUrl());
    return {
      photos: processImages(data),
      session: {user: username},
    }
  }

  async handleClick(e, index) {
    e.preventDefault();
    const data = await AsyncData.getData(getOrigin() + getPicsumAPIUrl(index));
    this.setState({
      currentPage: index,
      photos: processImages(data)
    });
  }

  render() {
    const { currentPage } = this.state;
    return (
      <Layout {...this.props} navmenu={false} title="Gallery">
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
