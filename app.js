new Vue({
    el: '#app',
    data: {
        running: false,
        monsterLife: 100,
        heroLife: 100,
        specialAttack: 5,
        cureAmount: 10,
        logs: [],
        winMessage: ['Herói não foi pareo para o Monstro! :)', 'Monstro é um monstro! :)', 'Guerreiro ao molho barbecue! :)'],
        loseMessage: ['Herói levou a cabeça do SCP-000 como troféu! :(', 'Herói é um herói! :(', 'Sopa de monstro! :(']
    },
    computed: {
        hasResult() {
            return this.monsterLife == 0 || this.heroLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.monsterLife = 100
            this.heroLife = 100
            this.specialAttack = 5
            this.cureAmount = 10
            this.logs = []
        },
        attack(special) {
            this.hurt('heroLife', 5, 10, this.specialAttack > 0 && special, 'Monstro', 'Heroi', 'monster')
            this.hurt('monsterLife', 7, 12, false, 'Guerreiro', 'Monstro', 'hero')
        },
        hurt(prop, min, max, special, source, target, style) {
            const plus = special ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.setLog(`${source} atingiu ${target} com ${hurt}.`, style)
        },
        healAndHurt() {
            if (this.cureAmount >= 0) {
                this.heal(10, 15)
                this.hurt('monsterLife', 7, 12, false, 'Guerreiro', 'Monstro', 'hero')
            }
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.monsterLife = Math.min(this.monsterLife + heal, 100)
            this.setLog(`Monstro recuperou ${heal} de vida.`, 'cure')
        },
        getRandom(min, max) {
            const value = Math.random() * (min - max) + min
            return Math.round(value)
        },
        setLog(text, style) {
            this.logs.unshift({ text, style })
        }
    },
    watch: {
        hasResult(value) {
            this.running = !value
        }
    }
})