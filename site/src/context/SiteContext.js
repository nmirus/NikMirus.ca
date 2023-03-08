import React from "react"

const defaultState = {
  indexVisible: false,
  setIndexVisibility: () => {},

  infoVisible: false,
  setInfoVisibility: () => {},

  introVisible: true,
  setIntroVisibility: () => {},

  title: "Nik Mirus",
  hoverTitle: "Nik Mirus",
  rootTitle: "Nik Mirus",
  titleVisible: true,
  changeTitle: () => {},
  resetTitle: () => {},
  setRootTitle: () => {},
  setTitleVisibility: () => {},
}

const SiteContext = React.createContext(defaultState)

class SiteProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      indexVisible: defaultState.indexVisible,

      infoVisible: defaultState.infoVisible,

      introVisible: defaultState.introVisible,

      title: defaultState.title,
      hoverTitle: defaultState.hoverTitle,
      rootTitle: defaultState.rootTitle,
      titleVisible: defaultState.titleVisible,
    }
  }

  setIndexVisibility = visibility => {
    this.setState({ indexVisible: visibility })
  }

  setInfoVisibility = visibility => {
    this.setState({ infoVisible: visibility })
  }

  setIntroVisibility = visibility => {
    this.setState({ introVisible: visibility })
  }

  setTitleVisibility = visibility => {
    this.setState({ titleVisible: visibility })
  }

  changeTitle = title => {
    this.setState({ title })
    console.log("Changing title to", title)
  }

  resetTitle = () => {
    const { rootTitle } = this.state

    console.log("Reset title to", rootTitle)

    // if (title.length > 1) {
    //   this.setState({
    //     title: this.state.title.slice(0, this.state.title.length - 1),
    //   })
    // } else {
    //   console.log("Title stays", title[0])
    // }

    this.setState({ title: rootTitle })

    return true
  }

  setRootTitle = title => {
    console.log("Setting root title to", title)

    this.setState({ rootTitle: title, title })
  }

  render() {
    const { children } = this.props
    const {
      indexVisible,
      infoVisible,
      introVisible,
      title,
      rootTitle,
      hoverTitle,
      titleVisible,
    } = this.state

    return (
      <SiteContext.Provider
        value={{
          indexVisible,
          setIndexVisibility: this.setIndexVisibility,

          infoVisible,
          setInfoVisibility: this.setInfoVisibility,

          introVisible,
          setIntroVisibility: this.setIntroVisibility,

          title,
          rootTitle,
          hoverTitle,
          titleVisible,
          changeTitle: this.changeTitle,
          resetTitle: this.resetTitle,
          setRootTitle: this.setRootTitle,
          setTitleVisibility: this.setTitleVisibility,
        }}
      >
        {children}
      </SiteContext.Provider>
    )
  }
}

export default SiteContext
export { SiteProvider }
