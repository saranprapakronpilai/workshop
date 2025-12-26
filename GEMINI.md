# GEMINI.md - AI Assistant Guidelines & Project Context

## 📚 Table of Contents

1. Executive Summary
2. Quick Start Guide
3. Project Context
4. Critical Safety Rules
5. Development Environment
6. Development Workflows
7. Context Management & Short Codes
8. Technical Reference
9. Development Practices
10. Lessons Learned
11. Troubleshooting
12. Appendices

## Executive Summary

This document provides comprehensive guidelines for an AI assistant working on this software development project. It establishes safe, efficient, and well-documented workflows to ensure high-quality contributions.

### Key Responsibilities

*   Code development and implementation
*   Testing and quality assurance
*   Documentation and session retrospectives
*   Following safe and efficient development workflows
*   Maintaining project context and history

### Quick Reference - Short Codes

#### Context & Planning Workflow (Core Pattern)

*   `ccc` - Create context issue and compact the conversation.
*   `nnn` - Smart planning: Auto-runs `ccc` if no recent context → Create a detailed implementation plan.
*   `gogogo` - Execute the most recent plan issue step-by-step.
*   `lll` - List project status (issues, PRs, commits) ✅

#### Project Management

*   `rrr` - Create a detailed session retrospective.

## Quick Start Guide

### Prerequisites

    # Check required tools (customize for your project)
    node --version
    python --version
    git --version
    gh --version      # GitHub CLI
    tmux --version    # Terminal multiplexer

### Initial Setup

    # 1. Clone the repository
    git clone [repository-url]
    cd [repository-name]

    # 2. Install dependencies
    # (e.g., pnpm install, npm install, pip install -r requirements.txt)
    [package-manager] install

    # 3. Setup environment variables
    cp .env.example .env
    # Edit .env with required values

    # 4. Setup tmux development environment
    # Use short code 'sss' for automated setup

### First Task

1.  Run `lll` to see the current project status.
2.  Run `nnn` to analyze the latest issue and create a plan.
3.  Use `gogogo` to implement the plan.

## Project Context

### Project Overview
This project is a lightweight 2D browser game (Snake implementation) developed to demonstrate generic web game architecture and simple mechanics.

### Architecture
*   **Stack:**
    *   **Core:** HTML5 (Structure), CSS3 (Presentation), Vanilla JavaScript (Logic).
    *   **Rendering:** HTML5 `<canvas>` API (2D Context).
    *   **Deployment:** Static file hosting (Client-side only).

### Key Concepts
1.  **The Game Loop:**
    *   The core heartbeat of the application. It separates the **Update** phase (calculating physics, collisions, positions) from the **Draw** phase (rendering to the canvas).
    *   *Implementation:* Uses `setInterval` or `requestAnimationFrame`.

2.  **Grid-Based Coordinate System:**
    *   Instead of pixel-perfect collision, the game world is divided into a grid (tiles).
    *   *Benefit:* Simplifies collision detection logic to simple integer comparisons (`x === x`).

3.  **Input Handling:**
    *   Event listeners capture user input (`keydown`).
    *   Input buffering or state checks prevent logic errors (e.g., preventing the snake from reversing direction instantly).

### Current Features
*   Snake movement and growth mechanics.
*   Food spawning logic.
*   Collision detection (walls and self).
*   Score tracking and High Score persistence (LocalStorage).
*   Neon visual style.

## 🔴 Critical Safety Rules

### Repository Usage
*   NEVER create issues/PRs on upstream

### Command Usage
*   NEVER use `-f` or `--force` flags with any commands.
*   Always use safe, non-destructive command options.
*   If a command requires confirmation, handle it appropriately without forcing.

### Git Operations
*   Never use `git push --force` or `git push -f`.
*   Never use `git checkout -f`.
*   Never use `git clean -f`.
*   Always use safe git operations that preserve history.
*   ⚠️ NEVER MERGE PULL REQUESTS WITHOUT EXPLICIT USER PERMISSION
*   Never use `gh pr merge` unless explicitly instructed by the user
*   Always wait for user review and approval before any merge

### File Operations
*   Never use `rm -rf` - use `rm -i` for interactive confirmation.
*   Always confirm before deleting files.
*   Use safe file operations that can be reversed.

### Package Manager Operations
*   Never use `[package-manager] install --force`.
*   Never use `[package-manager] update` without specifying packages.
*   Always review lockfile changes before committing.

### General Safety Guidelines
*   Prioritize safety and reversibility in all operations.
*   Ask for confirmation when performing potentially destructive actions.
*   Explain the implications of commands before executing them.
*   Use verbose options to show what commands are doing.

## Development Environment

### Environment Variables
(This section should be customized for the project)

#### Backend (.env)
    DATABASE_URL=
    API_KEY=

#### Frontend (.env)
    NEXT_PUBLIC_API_URL=

## Development Workflows

### Testing Discipline

#### Automated Tests

#### Manual Testing Checklist
Before pushing any changes:
[ ] Run the build command successfully.
[ ] Verify there are no new build warnings or type errors.
[ ] Test all affected pages and features.
[ ] Check the browser console for errors.
[ ] Test for mobile responsiveness if applicable.
[ ] Verify all interactive features work as expected.

### GitHub Workflow

#### Creating Issues
When starting a new feature or bug fix:

    # 1. Update main branch
    git checkout main && git pull

    # 2. Create a detailed issue
    gh issue create --title "feat: Descriptive title" --body "$(cat <<'EOF'
    ## Overview
    Brief description of the feature/bug.

    ## Current State
    What exists now.

    ## Proposed Solution
    What should be implemented.

    ## Technical Details
    - Components affected
    - Implementation approach

    ## Acceptance Criteria
    - [ ] Specific testable criteria
    - [ ] Performance requirements
    - [ ] UI/UX requirements
    EOF
    )"

#### Standard Development Flow

    # 1. Create a branch from the issue
    git checkout -b feat/issue-number-description

    # 2. Make changes
    # ... implement feature ...

    # 3. Test thoroughly
    # Use 'ttt' short code for the full test suite

    # 4. Commit with a descriptive message
    git add -A
    git commit -m "feat: Brief description

    - What: Specific changes made
    - Why: Motivation for the changes
    - Impact: What this affects

    Closes #issue-number"

    # 5. Push and create a Pull Request
    git push -u origin branch-name
    gh pr create --title "Same as commit" --body "Fixes #issue_number"

    # 6. ⚠️ CRITICAL: NEVER MERGE PRs YOURSELF
    # DO NOT use: gh pr merge
    # DO NOT use: Any merge commands
    # ONLY provide the PR link to the user
    # WAIT for explicit user instruction to merge
    # The user will review and merge when ready

## Context Management & Short Codes

### Why the Two-Issue Pattern?
The `ccc` → `nnn` workflow uses a two-issue pattern:
1.  Context Issues (`ccc`): Preserve session state and context.
2.  Task Issues (`nnn`): Contain actual implementation plans.

This separation ensures a clear distinction between context dumps and actionable tasks, leading to better organization and cleaner task tracking. `nnn` intelligently checks for a recent context issue and creates one if it's missing.

### Core Short Codes

#### `ccc` - Create Context & Compact
Purpose: Save the current session state and context to forward to another task.
1.  Gather Information: `git status --porcelain`, `git log --oneline -5`
2.  Create GitHub Context Issue: Use a detailed template to capture the current state, changed files, key discoveries, and next steps.
3.  Compact Conversation: `/compact`

#### `nnn` - Next Task Planning (Analysis & Planning Only)
Purpose: Create a comprehensive implementation plan based on gathered context. NO CODING - only research, analysis, and planning.
1.  Check for Recent Context: If none exists, run `ccc` first.
2.  Gather All Context: Analyze the most recent context issue or the specified issue (`nnn #123`).
3.  Deep Analysis: Read context, analyze the codebase, research patterns, and identify all affected components.
4.  Create Comprehensive Plan Issue: Use a detailed template to outline the problem, research, proposed solution, implementation steps, risks, and success criteria.
5.  Provide Summary: Briefly summarize the analysis and the issue number created.

#### `lll` - List Project Status ✅
When you see `lll`, execute relevant `gh` and `git` commands in parallel to get a full overview of the project's state, then provide a visual summary of open issues, recent PRs, and current focus.

#### `rrr` - Retrospective
Purpose: Document the session's activities, learnings, and outcomes.

⚠️ CRITICAL: The AI Diary and Honest Feedback sections are MANDATORY. These provide essential context and continuous improvement insights. Never skip these sections.

1.  Gather Session Data: `git diff --name-only main...HEAD`, `git log --oneline main...HEAD`, and session timestamps.
2.  Create Retrospective Document: Use the template to create a markdown file in `retrospectives/` with ALL required sections.
3.  Validate Completeness: Use the retrospective validation checklist to ensure no sections are skipped.
4.  Update GEMINI.md: Copy any new lessons learned to the main guidelines.
5.  Link to GitHub: Commit the retrospective and comment on the relevant issue/PR.

#### `gogogo` - Execute Planned Implementation
1.  Find Implementation Issue: Locate the most recent `plan:` issue.
2.  Execute Implementation: Follow the plan step-by-step, making all necessary code changes.
3.  Test & Verify: Run all relevant tests and verify the implementation works.
4.  Commit & Push: Commit with a descriptive message, push to the feature branch, and create/update the PR.

## Technical Reference

### Available Tools

#### Version Control

    # Git operations (safe only)
    git status
    git add -A
    git commit -m "message"
    git push origin branch

    # GitHub CLI
    gh issue create
    gh pr create

#### Search and Analysis

    # Ripgrep (preferred over grep)
    rg "pattern" --type [file-extension]

    # Find files
    fd "[pattern]"

## Development Practices

### Code Standards
*   Follow the established style guide for the language/framework.
*   Enable strict mode and linting where possible.
*   Write clear, self-documenting code and add comments where necessary.
*   Avoid `any` or other weak types in strongly-typed languages.

### Git Commit Format

    [type]: [brief description]

    - What: [specific changes]
    - Why: [motivation]
    - Impact: [affected areas]

    Closes #[issue-number]

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Error Handling Patterns
*   Use `try/catch` blocks for operations that might fail.
*   Provide descriptive error messages.
*   Implement graceful fallbacks in the UI.
*   Use custom error types where appropriate.

## Lessons Learned

### Canvas vs. DOM Manipulation
*   **Observation:** For games with many moving parts, updating a single `<canvas>` is significantly more performant than manipulating the DOM (moving `<div>` elements).
*   **Takeaway:** Always use Canvas or WebGL for rendering game loops.

### Separation of State and View
*   **Observation:** Keeping the game state (array of coordinates, score variable) separate from the drawing logic makes the code easier to debug.
*   **Takeaway:** Modify data first, then render based on that data. Do not rely on what is on the screen to determine game logic.

### Magic Numbers vs. Constants
*   **Observation:** Hardcoding values like grid size (20px) or speed (100ms) makes tuning difficult.
*   **Takeaway:** Define configuration constants at the top of the file (`const TILE_SIZE = 20;`, `const GAME_SPEED = 100;`) for easier maintainability and difficulty adjustments.

### User Feedback (UX)
*   **Observation:** Visual cues (Neon glow) and immediate feedback (Score updates) are crucial for engagement.
*   **Takeaway:** Even simple mechanics feel "polished" with the right use of CSS shadows and responsive UI.

### Planning & Architecture Patterns (General)
*   **Pattern:** Use parallel agents for analyzing different aspects of complex systems.
*   **Anti-Pattern:** Creating monolithic plans that try to implement everything at once.
*   **Pattern:** Ask "what's the minimum viable first step?" before comprehensive implementation.
*   **Pattern:** 1-hour implementation chunks are optimal for maintaining focus and seeing progress.

### Common Mistakes to Avoid
*   Creating overly comprehensive initial plans - Break complex projects into 1-hour phases instead.
*   Trying to implement everything at once - Start with minimum viable implementation, test, then expand.
*   Skipping AI Diary and Honest Feedback in retrospectives.

## Troubleshooting

### Common Issues

#### Build Failures
    # Check for type errors or syntax issues
    [build-command] 2>&1 | grep -A 5 "error"

    # Clear cache and reinstall dependencies
    rm -rf node_modules .cache dist build
    [package-manager] install

#### Port Conflicts
    # Find the process using a specific port
    lsof -i :[port-number]

    # Kill the process
    kill -9 [PID]

## Appendices

### A. Glossary
(Add project-specific terms here)
*   **Game Loop:** The continuous cycle of updating state and rendering frames.

### B. Quick Command Reference
    # Development
    [run-command]          # Start dev server
    [test-command]         # Run tests
    gh issue create        # Create issue
    gh pr create           # Create PR

    # Tmux
    tmux attach -t dev     # Attach to session
    Ctrl+b, d              # Detach from session

### C. Environment Checklist
[ ] Correct version of [Language/Runtime] installed
[ ] [Package Manager] installed
[ ] GitHub CLI configured
[ ] Tmux installed
[ ] Environment variables set
[ ] Git configured