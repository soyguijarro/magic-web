import React, { Component } from 'react';
import NotSupported from '../NotSupported';
import Message from '../Message';
import ShapeDetectionError from './ShapeDetectionError';
import ShapeDetectionResult from './ShapeDetectionResult';
import { isFaceDetectionSupported, getNumberOfFaces } from '../../../../helpers/shapeDetection';

const initialState = {
  isSupported: true,
  hasErrored: false,
  isLoading: false,
  photoUrl: null,
  numberOfFaces: null
};

class ShapeDetection extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.startPhotoSelection = this.startPhotoSelection.bind(this);
    this.handlePhotoSelection = this.handlePhotoSelection.bind(this);
    this.processPhoto = this.processPhoto.bind(this);
    this.resetExperiment = this.resetExperiment.bind(this);
  }

  componentDidMount() {
    if (!isFaceDetectionSupported) this.setState({ isSupported: false });
    this.photoElement.addEventListener('load', this.processPhoto);
  }

  componentWillUnmount() {
    this.photoElement.removeEventListener('load', this.processPhoto);
  }

  startPhotoSelection(event) {
    this.inputElement.click();
  }

  handlePhotoSelection({ target: { files }}) {
    if (!files.length) return this.setState({ hasErrored: true });

    // Terrible timeout hack to ensure spinner is shown (UI freezes while waiting for loading event)
    this.setState({ isLoading: true }, () => {
      setTimeout(() => {
        this.setState({ photoUrl: window.URL.createObjectURL(files[0]) });
      }, 0);
    });
  }

  processPhoto() {
    getNumberOfFaces(this.photoElement)
      .then(numberOfFaces => this.setState({ isLoading: false, numberOfFaces }))
      .catch(() => this.setState({ isLoading: false, hasErrored: true }));
  }

  resetExperiment() {
    this.setState(initialState);
    this.componentWillUnmount();
  }

  render() {
    const { isSupported, hasErrored, isLoading, photoUrl, numberOfFaces } = this.state;

    if (!isSupported) return <NotSupported />;

    if (hasErrored) {
      return (
        <ShapeDetectionError
          handleRetryClick={this.resetExperiment}
        />
      );
    }

    if (numberOfFaces !== null) {
      return (
        <ShapeDetectionResult
          numberOfFaces={numberOfFaces}
        />
      );
    }

    return (
      <Message
        iconName={isLoading ? 'loop' : 'photo_camera'}
        iconClassModifier={isLoading ? 'spin' : undefined}
      >
        {!isLoading &&
          <div>
            <button
              className="experiment__playground__content__button"
              onClick={this.startPhotoSelection}
            >
              Take photo
            </button>
            <input
              ref={(input) => { this.inputElement = input; }}
              type="file"
              accept="image/*"
              capture="camera"
              hidden
              onChange={this.handlePhotoSelection}
            />
          </div>
        }
        <img
          ref={(img) => { this.photoElement = img; }}
          src={photoUrl}
          role="presentation"
          hidden
        />
      </Message>
    );
  }
}

export default ShapeDetection;
