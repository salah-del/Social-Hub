export const BASE_URL = `http://localhost:5173/api`;

export const API = {
  /* ======= Authentication ======= */
  signup: `${BASE_URL}/auth/signup`,
  signin: `${BASE_URL}/auth/signin`,
  /* ======= Posts ======= */
  addPost: `${BASE_URL}/routPost`,
  deletePost: `${BASE_URL}/routPost`, //     /:idPost
  getAllPosts: `${BASE_URL}/routPost/random`, //     /:idUser
  getPostsUser: `${BASE_URL}/routPost/find`, //     /:idUser
  updatePost: `${BASE_URL}/routPost`, //     /:idPost
  likePost: (idPost) => `${BASE_URL}/routPost/${idPost}/like`,
  dislikePost: (idPost) => `${BASE_URL}/routPost/${idPost}/dislike`,
  copyUrlForPost: (idPost) => `${BASE_URL}/routPost/${idPost}/copyUrl`,
  savePost: `${BASE_URL}/routPost/savePost`, //     /:idPost
  unsavePost: `${BASE_URL}/routPost/unsavePost`, //     /:idPost
  /* ======= Masseges ======= */
  SendMassege: `${BASE_URL}/messages`, // Post
  getMasseges: `${BASE_URL}/messages`,
  /* ======= Comments ======= */
  addComment: `${BASE_URL}/comments`,
  replyComment: `${BASE_URL}/comments`,
  getComments: `${BASE_URL}/comments`, //     /:idPost
  deleteComment: `${BASE_URL}/comments`, //     /:idComment
  /* ======= Videos ======= */
  addVideo: `${BASE_URL}/videos`,
  getVideo: `${BASE_URL}/videos`,
  searchVideo: `${BASE_URL}/videos/search`, //   params : q
  getTrendVideos: `${BASE_URL}/videos/trend`,
  getRandomVideos: `${BASE_URL}/videos/random`,
  getVideosByTags: `${BASE_URL}/videos/tags`, // params : tags as a string
  getVideosForSpecificUser: `${BASE_URL}/videos/find`, // /:userId
  viewVideo: `${BASE_URL}/videos/viewMoudel`, //   /:videoId
  updateVideo: `${BASE_URL}/videos`, //   /:videoId
  deleteVideo: `${BASE_URL}/videos`, //   /:videoId
  copyUrlForVideo: (idVideo) => `${BASE_URL}/videos/${idVideo}/copyUrl`,
  saveVideo: `${BASE_URL}/videos/save`, //   /:videoId
  unSaveVideo: `${BASE_URL}/videos/unsave`, //   /:videoId
  /* ======= Users ======= */
  getAllUsers: `${BASE_URL}/users/getRandomUsers`,
  searchByName: `${BASE_URL}/users/Search_Users_Name`,
  getUserById: `${BASE_URL}/users/find`, //     /:userID
  updateUser: `${BASE_URL}/users`, // :userId
  subscribe: `${BASE_URL}/users/sub`, //   /:userID
  unsubscribe: `${BASE_URL}/users/unsub`, //   /:userID
  addFriend: `${BASE_URL}/users/send-request`, //     /:FriendID

  acceptFriend: `${BASE_URL}/users/accept-request`, //     /:senderId
  rejectFriend: `${BASE_URL}/users/reject-request`, //     /:senderId

  blockUser: `${BASE_URL}/users/block`,
  unBlockUser: `${BASE_URL}/users/unblock`,

  deleteUser: `${BASE_URL}/users`, //   /:userId
  likeVideo: `${BASE_URL}/users/like`, //   /:videoId
  dislikeVideo: `${BASE_URL}/users/dislike`, //   /:videoId
  /* ======= Communities ======= */
  createCommunity: `${BASE_URL}/communities/create`,
  getCommunityById: `${BASE_URL}/communities/community`, // /:idCommunity
  inviteToCommunity: `${BASE_URL}/communities/invite`,
  acceptInvitation: `${BASE_URL}/communities/accept-invitation`,
  leaveCommunity: `${BASE_URL}/communities/exit-community/`, // /:idCommunity
  deleteCommunity: `${BASE_URL}/communities/delete-community/`, // /:idCommunity
  /* ======= Notifications ======= */
  getNotifications10By10: `${BASE_URL}/notifications`, //     /:idUser
  getNotificationsNotReaded: `${BASE_URL}/notifications/New`, //     /:idUser
  markIsReadNotifications: `${BASE_URL}/notifications/MarkIsRead`, //     /:idNotification
  /* ======= Balance ======= */
  getBalance: `${BASE_URL}/balances/get-balance`,
  bonusCoins: `${BASE_URL}/balances/bonus-coins`,
  deductCoins: `${BASE_URL}/balances/deduct-coins`,
  dailyBonus: `${BASE_URL}/premium-plans/Statistics`,
  /* ======= ChatGPT ======= */
  sendMasgageToChatGPT: `${BASE_URL}/chatRoutes/chatBot`,
  /* ======= Owners ======= */
  /* ======= Premium ======= */
  subscribePlan: `${BASE_URL}/premium-plans/subscribe`,
  getUserPlanById: `${BASE_URL}/premium-plans/PlanType`, //     /:idUser
  currentUserPlanExpiration: `${BASE_URL}/premium-plans/premium/expiration`,
  /* ======= Test 222 ======= */
};
