function TimeSince({item}) {

    const currentTime = new Date()
    const postedAt = new Date(item.createdAt)
    const minutesSince = Math.floor((currentTime - postedAt)/60000)
    const hoursSince = Math.floor((minutesSince)/60)
    const daysSince = Math.floor((minutesSince)/1440)
    const monthsSince = Math.floor((minutesSince)/43800)
    const yearsSince = Math.floor((minutesSince)/525600)

    let timeSince = ''
    if (minutesSince < 2) {
        timeSince = `a moment ago`
    } else if (minutesSince < 60) {
        timeSince = `${minutesSince} minutes ago`
    } else if (minutesSince < 120) {
        timeSince = `1 hour ago`
    } else if (minutesSince < 1440) {
        timeSince = `${hoursSince} hours ago`
    } else if (minutesSince < 2880) {
        timeSince = `1 day ago`
    } else if (minutesSince < 43800) {
        timeSince = `${daysSince} days ago`
    } else if (minutesSince < 87600) {
        timeSince = `1 month ago`
    } else if (minutesSince < 525600) {
        timeSince = `${monthsSince} months ago`
    } else if (minutesSince < 151200) {
        timeSince = `1 year ago`
    } else {
        timeSince = `${yearsSince} years ago`
    }

  return (
    <span className='text-xs italic'>{timeSince}</span>
  )
}

export default TimeSince