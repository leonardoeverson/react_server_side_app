import App, { Container } from 'next/app'
import React from 'react'
import MorphTransition from 'nextjs-morph-page'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <MorphTransition timeout={300} classNames="morph">
          <Component {...pageProps} />
        </MorphTransition>
        <style jsx global>{`
          .morph.enter {
            opacity: 0;
          }
          .morph.enter.active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .morph.exit {
            opacity: 1;
          }
          .morph.exit.active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}</style>
      </Container>
    )
  }
}