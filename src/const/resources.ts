export enum RESOURCE {
    organisation = 'organisations',
    election = 'elections',
    voter = 'voters',
    candidate = 'candidates',
    ballot = 'ballots',
    profile = 'profiles',
    email_token = 'email-tokens',
    email_batch = 'email-batches',
    voter_tag = 'voter-tags',
    voter_digest = 'voter-digests',
    admin_users = 'admin_users',
}

export enum ACTION {
    LIST = "LIST",
    SHOW = "SHOW",
    EDIT = "EDIT",
    CREATE = "CREATE",
}