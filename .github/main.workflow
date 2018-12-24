workflow "New workflow" {
  on = "push"
  resolves = ["packagr", "lint"]
}

action "install" {
  uses = "actions/npm@e7aaefe"
  runs = "install"
}

action "packagr" {
  uses = "actions/npm@e7aaefe"
  needs = ["install"]
  runs = "packagr"
}

action "lint" {
  uses = "actions/npm@e7aaefe"
  needs = ["install"]
  runs = "lint"
}
