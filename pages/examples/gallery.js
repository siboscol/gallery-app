import Gallery from 'react-grid-gallery';
import Page from '../../components/page';
import Layout from '../../components/layout';
import AsyncData from '../../components/async-data';

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

  static async getInitialProps({ req }) {
    const data = await AsyncData.getData('https://picsum.photos/v2/list?limit=100');
    console.log('data length', data.length);
    return {
      photos: processImages(data)
    }
  }
  render() {
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
          <Gallery images={this.props.photos} enableImageSelection={false}/>
        </div>
      </Layout>
    )
  }
}
