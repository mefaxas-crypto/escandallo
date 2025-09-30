{ pkgs, ... }: {
  # Let Nix know to use the stable channel of nixpkgs.
  channel = "stable";
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs
    pkgs.nodePackages.npm
    pkgs.firebase-tools
  ];
  # Sets environment variables in the workspace
  env = {};
  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  extensions = [];

  # Designer events
  devcontainer = {
    onCreateCommand = '''
      npm install
    '''
  };

  # The following scripts will be returned to the client to execute.
  scripts = {
    start = {
      name = "Start Express Server";
      description = "Starts the Express server for the application.";
      exec = "npm start";
    };
  };
}