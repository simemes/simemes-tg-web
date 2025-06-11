import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    userLvl: 0,
    isJoin: false,
    isClaim: false,
    task1_num: 0,
    task2_num: 0,
    task3_num: 0,
    home_context: {
        lvl: ['Farmer','McDonald\'s Intern','Merch','President'],
        join: {
            title: 'Join The Early Access',
            txt: 'What happens in SIMemes, stays in SIMemes.',
            isJoinTitle: 'Welcome to SIMemes!',
            isJoinTxt: 'You’re almost there...',
            isClaimTxt: 'You’re in, stay tuned...',
            btn: 'Join'
        },
        claim: {
            title: 'Just claim and drink up',
            btn: 'Claim'
        },
        upgrade: {
            title: 'Your early access reward',
            btn: 'Upgrade'
        }
    },
    tasks_context: {
        lvlist: ['Farmer','McDonald\'s Intern','Merch','President'],
        getPromote: {
            title: 'Level up and get promoted!',
            btn: 'Get Promoted',
        },
        tasks: {
            title: 'Complete tasks to upgrade',
            followBtn: 'Follow',
            inviteBtn: 'Invite',
            inviteTxt: '<p>I’m inviting you to join me in SIMemes Early Access!</p><p>Join NOW to secure your spot, earn Bonuses and get promoted in SIMemes.</p><p>Just remember, what happens in SIMemes, stays in SIMemes.</p>',
            inviteAmount: [2, 5, 10],
            lvl: [
                {
                    'task1': 'Follow SIMemes on Twitter',
                    'task2': 'Follow SIMemes Announcement',
                    'task3': 'Invite 2 Friends',
                },
                {
                    'task1': 'Follow Move Industries on Twitter',
                    'task2': 'Follow SIMemes Announcement',
                    'task3': 'Invite 5 Friends',
                },
                {
                    'task1': 'Follow SIMemes Intern on Twitter',
                    'task2': 'Follow SIMemes Announcement',
                    'task3': 'Invite 10 Friends',
                },
            ]
        }
    }
  }),
  actions: {
    // setName(newName: string) {
    //   this.name = newName
    // },
  },
})