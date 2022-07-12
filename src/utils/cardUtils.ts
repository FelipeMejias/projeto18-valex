import dayjs from 'dayjs'
export function defineCardholderName(fullName:string){
    const list = fullName.toUpperCase().split(' ')
    const finalList=[list[0]]
    for(let k=1;k<list.length-1;k++){
        if(list[k].length>=3)finalList.push(list[k])
    }
    finalList.push(list[list.length-1])
    return finalList.join(' ')
}
export function defineExpirationDate(){
    const today= dayjs().format('MM/YY')
    const expirationYear=parseInt(today[3]+today[4])+5
    return today[0]+today[1]+today[2]+expirationYear
}

export function checkExpiriration(expiration:string){
    const today= dayjs().format('MM/YY')
    const todayYear=parseInt(today[3]+today[4])
    const todayMonth=parseInt(today[0]+today[1])
    const expirationYear=parseInt(expiration[3]+expiration[4])
    const expirationMonth=parseInt(expiration[0]+expiration[1])
    if(
        (todayYear>expirationYear)||
        (todayYear===expirationYear && todayMonth>=expirationMonth)
    ){return true}else{return false}
}