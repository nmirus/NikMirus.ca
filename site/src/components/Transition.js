import React from "react"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"

class Transition extends React.PureComponent {
  static defaultProps = {
    timeout: 250,
  }

  render() {
    const { children, id, timeout, enterTimeout, exitTimeout } = this.props

    const transitionStyles = {
      entering: {
        position: `absolute`,
        opacity: 0,
      },
      entered: {
        transition: `opacity ${
          typeof enterTimeout !== "undefined" ? enterTimeout : timeout
        }ms ease-in-out`,
        opacity: 1,
      },
      exiting: {
        transition: `opacity ${
          typeof exitTimeout !== "undefined" ? exitTimeout : timeout
        }ms ease-in-out`,
        opacity: 0,
      },
    }

    return (
      <TransitionGroup>
        <ReactTransition
          key={id}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              style={{
                ...transitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
  }
}

export default Transition
