import React from "react";
import Sections from "./components/Sections";
import Header from "./components/Header"
import Wrapper from "./components/Wrapper";
import pictures from "./pictures.json";
import "./App.css";

class App extends React.Component {
state = {
    pictures,
    score: 0,
    newArray: []
}

componentDidMount() {
    this.randomFunc();
}

randomFunc = () => {
    console.log("here in random")
    var array = this.state.pictures
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    this.select(array);
    // var array = [];
    // var pics = this.state.pictures
    // for (let i = pics.length - 1; i > 0; i--) {
    //     let j = Math.floor(Math.random() * (i + 1));
    //     [pics[i], pics[j]] = [array[j], array[i]];
    //   }
    // console.log(array);
    // this.select(array);
}

select = (array) => {
    var newArraySliced = array.slice(-12)
    console.log("here")
    this.state.newArray.push(newArraySliced);
}

handleStatus = (id, name) => {
    const pictures = this.state.pictures;
    if (pictures[id - 1].isClicked) {
        //this.setState({pictures})
        console.log(`You already clicked on ${name}. You lose!`)
        var r = window.confirm(`You already clicked on ${name}! Your final score was ${this.state.score}. Click to play again.`) 
        if (r === true) {
            window.location.reload()
        }
        else {
            alert("Thank you for playing!")
        }

        }
        else {
            this.randomFunc();
            this.setState({ score: this.state.score + 1 });
            pictures[id - 1].isClicked = true;
            console.log(`You clicked on ${name}.`)
            if (this.state.score === 12) {
              var p = window.confirm("You won! Click OK to play again.")
              if (p === true) {
                window.location.reload()
              }
              else {
                alert("Thank you for playing!")
              }
            }
        }
    }

  render() {
    return (
        <div>
      <Header />
      <div className = "scoreMain">
            score: <span className = "score">{this.state.score}</span>/12
      </div>

      <Wrapper>
        {
          this.state.pictures.map(picture => 
            <Sections
               key={picture.id}
               id={picture.id}
               name={picture.name}
               image={picture.image}
               handleStatus={this.handleStatus}
            />
          )
        }
      </Wrapper>
      </div>
    );
  }
}

export default App;
