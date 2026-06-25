# Agent Safety Guidelines 🛡️


## Purpose

This AI agent converts specifications into code with human oversight.


## The Three Laws

1. **Human Approval Required**: Every change needs explicit review

2. **Bounded Scope**: Agent only modifies files in `src/`

3. **Read Before Write**: Agent must see current code before changes


## Approved Actions

✅ Read any file in `specs/`  

✅ Generate Code

✅ Suggest improvements 

✅ Update files in `docs/`

- Update files in `specs/` only after explicit permission


## Forbidden Actions

❌ Delete files without explicit permission  

❌ Modify `specs/` folder (read-only) without explicit permission

❌ Modify `.git` configurations  


## Human Responsibilities

- Review every line of generated code

- Test in browser before committing

- Keep specifications clear and detailed

- Commit frequently to create rollback points


## Emergency Recovery

If agent generates bad code:

1. Do NOT commit the changes

2. If already committed, use Git history to restore previous version

3. Clarify the specification and regenerate

4. Document what went wrong to prevent recurrence