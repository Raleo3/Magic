import React, { useState, useEffect } from 'react';
import Loader from '../loader/loader';
import Card from '../card/card';
import MessageSegment from '../messageSegment/messageSegment';
import { getCardsByType } from '../../api/magic/card-service';

import { CREATURE } from '../../constants/type';
import './card-list.css';

/**
  * Keeping nextPage var out of component state since the component should not re-render when it changes
  * Used for API calls only
  */
let nextPage = 1;

const CardList = props => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    /**
      * Sets the state upon successful cards API request
      * if - cards array is empty, replace it with fetched data
      * else - concat existing data and new data
      *
      * increment nextPage (to fetch) by 1 after successful cards API request
      *
      * @param {String} type - card type needed for targeted API request
      */
    const fetchCards = async (type, page) => {
        try {
            setLoading(true);
            const response = await getCardsByType(page, type, 20);

            setCards(prevState => prevState.length === 0 ? response.data.cards : prevState.concat(response.data.cards));
            nextPage = ++nextPage;
            setLoading(false);
        }
        catch (err) {
            setErrorMessage(true);
        }
    };

    /**
      * Fetch Cards once upon Component init
      */
    useEffect(() => {
        fetchCards(CREATURE, nextPage);
    }, []);

    /**
      * Add & Remove Event Listeners upon init & destruction of component
      */
    useEffect(() => {
        /**
          * if - there isn't a searchTerm
          * && - the content loaded is > 90% vertically scrolled through
          * then - fetch more cards from the API
          *
          * @param {Object} event - default event emitted by the browser API
          */
        const onScroll = (e) => {
            const cardList = document.getElementById('card-list');

            if (cardList && !loading && !props.term && (document.body.offsetHeight + window.pageYOffset > (cardList.offsetHeight + 30) * .9)) {
                fetchCards(CREATURE, nextPage);
            };
        }

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [loading, props.term]);

    /**
     *  Run basic case insensitive Regex vs. search Query
     *
     *  @return {Array} cards array - per regex match
     */
    const filterBySearchTerm = () => {
        const regEx = new RegExp(props.term.trim(), 'i');
        return cards.filter(card => card.name.match(regEx) !== null);
    }

    /**
     *  Clone cards from state, alphabetical string sort according to sort selection criteria
     *
     *  @param {Array} cards array
     *  @return {Array} cards array - sorted
     */
    const sortBySelection = (cards) => {
        const sortType = props.sort.value;

        return cards.sort((a, b) => {
          if (a[sortType] < b[sortType]) {
            return -1;
          }

          if (a[sortType] > b[sortType]) {
            return 1;
          }

          return 0;
        });
    }

    /**
     *  If necessary, run filter & sort functions
     *
     *  @return {Array} cards array
     */
    const filterAndSortCards = () => {
        const { term, sort } = props;
        let cardsForDisplay = [...cards];

        if (term) {
            cardsForDisplay = filterBySearchTerm();
        }

        if (sort) {
            cardsForDisplay = sortBySelection(cardsForDisplay);
        }

        return cardsForDisplay;
    }

    /**
     *  Render appropriate JSX
     *
     *  if - state does not contains cards (i.e cards are being fetched from the API)
     *  @return {Object} Loader Component
     *
     *
     *  if - state contains cards (i.e cards have successfully been fetched from the API)
     *  && there are no cards to render (due to our searchTerm)
     *  @return {Object} MessageSegment Component
     *
     *  else -
     *  @return {Object} list of Card Component
     */
    const renderList = () => {
        const cardsToRender = filterAndSortCards().map(card => {
            return (
                <div key={card.id + Math.random()}>
                    <Card card={card} />
                </div>
            );
        });

        if (cards.length === 0 && !errorMessage) {
            return <Loader loadingMessage='Preparing Magic...' />;
        }

        if (cards.length === 0 && errorMessage) {
            return <MessageSegment messageText="We are having technical problems, please try again."/>
        }

        if (cards.length > 0 && cardsToRender.length === 0) {
            return <MessageSegment messageText="Your spell looks a bit imprecise, please craft again."/>
        }

        return (
            <div id="card-list">
                {cardsToRender}
            </div>
        );
    }

    return (
        <div>
            {renderList()}
        </div>
    );
}

export default CardList;
