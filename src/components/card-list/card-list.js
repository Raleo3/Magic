import React from 'react';
import { getCardsByType } from '../../api/magic/card-service';
import { CREATURE } from '../../constants/type';
import { SORT_OPTIONS } from '../../constants/sort-options';
import './card-list.css';


class CardList extends React.Component {
    state = {
        cards: [],
        cardsOnDeck: [],
        loadingCards: false,
        nextPage: 1
     };

    async fetchCards(type) {
        const response = await getCardsByType(this.state.nextPage, type);
        const imageCards = response.data.cards.filter(card => card.imageUrl);

        this.setState(prevState => ({
            cards: prevState.cards.length === 0 ? imageCards.slice(0, 20) : prevState.cards.concat(prevState.cardsOnDeck, imageCards.slice(0, 20 - prevState.cardsOnDeck.length)),
            cardsOnDeck: prevState.cardsOnDeck.length === 0 ? imageCards.slice(20) : imageCards.slice(20 - prevState.cardsOnDeck.length),
            nextPage: ++prevState.nextPage
        }));
    }

    async loadMoreCards() {
        if (this.state.cardsOnDeck >= 20){
            this.setState(prevState => ({
                cards: prevState.cards.concat(prevState.cardsOnDeck.slice(0, 20)),
                cardsOnDeck: prevState.cardsOnDeck.slice(20)
            }));
            return;
        }

        this.setState({ loadingCards: true });
        await this.fetchCards(CREATURE);

        // Temp. additional pause to allow browser to render new list before assessing scrollY position
        window.setTimeout(() => {
            this.setState({ loadingCards: false });
        }, 500);
    }

    sortAndFilter() {
        let filteredCards = this.state.cards;

        // filter
        if (this.props.term) {
            const regEx = new RegExp(this.props.term.trim(), 'i');
            filteredCards = this.state.cards.filter(card => card.name.match(regEx) !== null);
        }

        // sort
        if (this.props.sort) {
            let sortType = this.props.sort.value;

            filteredCards.sort((a, b) => {
              let one = a[sortType];
              let two = b[sortType];

              // If artist, sort by last name
              if (sortType === SORT_OPTIONS[2].value) {
                  one = a[sortType].split(' ').slice(-1)[0];
                  two = b[sortType].split(' ').slice(-1)[0];
              }

              if (one < two) {
                return -1;
              }

              if (one > two) {
                return 1;
              }

              return 0;
            });
        }

        return filteredCards;
    }

    renderList () {
        const cards = this.sortAndFilter().map(card => {
            return (
                <div key={card.id} className="ui card single-card">
                  <div className="image">
                    <img alt={card.name} src={card.imageUrl} />
                  </div>
                  <div className="content">
                    <h3 className="header">{card.name}</h3>
                    <div className="description">
                        <div className="set-name">
                          Set: {card.setName}
                        </div>
                        <div className="original-type">
                          Original Type: {card.originalType}
                        </div>
                    </div>
                  </div>
                  <div className="extra content">
                    <span>Artist: {card.artist}</span>
                  </div>
                </div>
            );
        });

        if (this.state.cards.length > 0 && cards.length === 0) {
            return (
                <div className="ui placeholder segment">
                  <div className="ui icon header">
                    <div>
                        <i className="close icon"></i>
                        <i className="magic icon"></i>
                    </div>
                    Your spell looks a bit imprecise, please craft another.
                  </div>
                </div>
            );
        }

        if (cards.length === 0) {
            return (
                <div className="ui segment show-loader">
                  <div className="ui active inverted dimmer">
                    <div className="ui large text loader">Preparing Magic</div>
                  </div>
                  <p></p>
                  <p></p>
                  <p></p>
                </div>
            );
        }

        return (
            <div id="card-list">
                {cards}
            </div>
        );
    }

    componentDidMount() {
        window.onscroll = (ev) => {
            const cardList = document.getElementById('card-list');

            // If user has scrolled down >= 90% height of cardList + pageHeader + vertical margins, loadMoreCards()
            // Also, we prevent infinite load if filter is active
            if (cardList && !this.state.loadingCards && !this.props.term && (document.body.offsetHeight + window.pageYOffset > (cardList.offsetHeight + 91 + 30) * .9)) {
                this.loadMoreCards();
            }
        };

        this.fetchCards(CREATURE);
    }

    render () {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}

export default CardList;
