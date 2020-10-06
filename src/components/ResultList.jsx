import React from 'react'
import ResultItem from './ResultItem'
import resultsService from '../services/scores'
import {useParams} from 'react-router-dom'

const ResultList = ({user, results, setResults}) => {
    const judge = useParams().tag
    const company = useParams().mention

    if (judge) {
        results = results.filter(p => p.judge && p.judge === judge )
    }

    if (company) {
        results = results.filter(p => p.company && p.company === company)
    }

    const deleteResult = (score) => {
        resultsService.delete(score.id, user)
            .then(data => {
                const updatedPosts = results.filter(p => p.id !== score.id)
                setResults(updatedPosts)
            })
    }

    console.log(results)

    return(
        <ul className="list-group list-group-flush bg-white border rounded">
            {results && results.map((result) => (
                <ResultItem key={result.id} score={result} user={user} deleteFn={deleteResult}/>
            ))}
            {results && !results.length &&
                <li className="list-group-item text-muted text-center">
                    <h5>no results found</h5>
                </li>
            }
        </ul>
    )
}
export default ResultList
