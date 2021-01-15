

const teamMember = "hihi"

const resolver = {
    Query: {
        Channel: () => { return teamMember }
    }
}

export default resolver;