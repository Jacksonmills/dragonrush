declare global {
  interface HTMLCanvasElement {
    requestPictureInPicture(): Promise<void>;
  }
}