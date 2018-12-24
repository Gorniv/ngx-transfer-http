workflow "New workflow" {
  on = "push"
  resolves = ["packagr", "lint"]
}

action "Install" {
  uses = "actions/npm@e7aaefe"
  args = "install"
}

action "packagr" {
  uses = "actions/npm@e7aaefe"
  needs = ["Install"]
  args = ["run", "packagr"]
}

action "lint" {
  uses = "actions/npm@e7aaefe"
  needs = ["Install"]
  args = ["run", "lint"]
}
