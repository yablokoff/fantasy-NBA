import React, {useEffect} from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Page from "../components/Page";
import MainList from "../components/MainList";
import MainEmpty from "../components/MainEmpty";
import { CARDS_SHOW_COUNT } from "../constants/defaults";
import { showPreloader, hidePreloader, loadDailyPlayers } from "../actions";
import { LOAD_DAILY_PLAYERS_FULFILLED } from "../constants/ActionTypes";
import { formattingDailyPlayersResponse } from "../api";
import { fetchedCards } from "../storage/cards";
import { getRandomIntList } from "../utils";
import routes from "../constants/routes";


const MainPage = () => {
    const dispatch = useDispatch();
    const { ids: fetched_ids } = useSelector(state => state.fetchedCardsIDs);
    const { ids: selected_ids } = useSelector(state => state.selectedCardsIDs);
    const hasFetched = fetched_ids.length;
    const hasSelected = selected_ids.length;

    useEffect(() => {
        if (!hasSelected && !hasFetched) {
            console.log('load daily');
            dispatch(showPreloader());
            dispatch(
                loadDailyPlayers()
            ).then(
                ({value, action}) => {
                    if (action && action.type === LOAD_DAILY_PLAYERS_FULFILLED) {
                        const cards_ids = formattingDailyPlayersResponse(value.data);
                        const count = cards_ids.length;

                        if (count < CARDS_SHOW_COUNT) {
                            dispatch(hidePreloader());
                            return Promise.resolve(null);
                        }

                        const indexes = getRandomIntList({
                            count: CARDS_SHOW_COUNT,
                            rangeMin: 0,
                            rangeMax: count - 1
                        });
                        fetchedCards.set({
                            card_ids: cards_ids.filter((id, i) => indexes.includes(i))
                        });
                    }
                }, (error) => {}
            );
        }
    }, []);

    return (
        hasSelected ?
            <Redirect to={routes.thanks} />
            :
            <Page>
                <div className="cards-wrapper">
                    <div className="container">
                        {hasFetched ? <MainList fetched_ids={fetched_ids} /> : <MainEmpty />}
                    </div>
                </div>
            </Page>
    );
};

export default MainPage;
