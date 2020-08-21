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
    const fetched_ids = fetchedCards.get();
    const card_ids = fetched_ids && fetched_ids.card_ids || [];
    // const { ids: fetched_ids } = useSelector(state => state.fetchedCardsIDs);
    const { ids: selected_ids } = useSelector(state => state.selectedCardsIDs);
    const hasFetched = card_ids.length;
    const hasSelected = selected_ids.length;

    useEffect(() => {
        if (!hasSelected && !hasFetched) {
            dispatch(showPreloader());
            dispatch(
                loadDailyPlayers()
            ).then(
                ({value, action}) => {
                    if (action && action.type === LOAD_DAILY_PLAYERS_FULFILLED) {
                        const formattedData = formattingDailyPlayersResponse(value.data);
                        const count = formattedData.length;

                        if (count < CARDS_SHOW_COUNT) {
                            dispatch(hidePreloader());
                            return Promise.resolve(null);
                        }

                        const indexes = getRandomIntList({
                            count: CARDS_SHOW_COUNT,
                            rangeMin: 0,
                            rangeMax: count - 1
                        });

                        const pd_ids = formattedData.map(pd => pd.id);
                        const cards_ids = formattedData.map(pd => pd.card_id);
                        fetchedCards.set({
                            pd_ids: pd_ids.filter((id, i) => indexes.includes(i)),
                            card_ids: cards_ids.filter((id, i) => indexes.includes(i)),
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
                        {hasFetched ? <MainList fetched_ids={card_ids} /> : <MainEmpty />}
                    </div>
                </div>
            </Page>
    );
};

export default MainPage;
