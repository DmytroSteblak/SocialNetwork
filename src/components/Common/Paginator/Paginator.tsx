import React, {useState} from "react";
import s from "./Paginator.module.css"
import cn from "classnames"

interface paginatorTypeProps{
    totalItemsCount: number,
    currentPage: number,
    pageSize: number,
    onPageChanged: (p:number) => void
    portionSize?: number
}

const Paginator: React.FC<paginatorTypeProps> = ({totalItemsCount,currentPage,pageSize,onPageChanged,portionSize = 10}):JSX.Element =>{

    let pageCount = Math.ceil(totalItemsCount / pageSize)

    let pages:Array<number> = []
    for (let i = 1; i <= pageCount; i++){
        pages.push(i)
    }

    let portionCount = Math.ceil(pageCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize


    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Назад</button>   }

            {pages
                .filter(p => p >= leftPortionPageNumber && p<= rightPortionPageNumber)
                .map((p,id) => {
                return (
                    <span
                        onClick={() => onPageChanged(p)}
                        className={cn({
                            [s.currentPage]: currentPage === p
                        }, s.pageNumber
                        )}
                        key={id}>{p}

                    </span>
                )
            })}
            {portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>Дальше</button>}
        </div>
    )
}


export default Paginator;