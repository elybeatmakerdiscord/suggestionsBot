module.exports = {
  affectedChannnels: ["196370008329158656","554566075333869579"],
  logChannels: ["342621779950305291"],
  immuneRoles: ["648861308216803328"],
  immuneUsers: ["102565059565203456"],
   
  deleteTimer: [10000],
  
  urlRegex: /((http(s)?:\/\/)?(youtu\.be\/|youtube.com\/watch\?v=))(.{11})/gi,
  timestampRegex: /((\&|\?)(t=)\d+)|((\d\d?:)?\d\d?:\d\d)/g,
  
  botToken: ":^)",
  
  language: {
    title: "RemixSuggestions",
    log: {
      failedLink: "[Failed Link]",
      failedTimestamp: "[Failed Timestamp]",
      says: "tried to say",
      in: "in"
    },
    userErrors: {
      failedLink: "Please include a link to the video you want remixed, and a timestamp",
      failedTimestamp: "Please include the time of the video you want remixed",
    },
    tips: [
        "TIP: If you already submitted a suggestion, and want to add a comment, edit your previous message.",
        "TIP: You can copy a link and timestamp from a youtube video by right clicking, and clicking \"Copy video URL at current time\""
      ]
  }
}
