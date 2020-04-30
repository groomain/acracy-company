Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-16.04"

  # NOTE: This will enable public access to the opened port
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 42213, host: 42213

  # NOTE PUT LINUX BOX ON SAME PUBLIC NETWORK AS HOST
  # config.vm.network "public_network"
  # config.vm.network "private_network", type: "dhcp"
  # config.vm.synced_folder ".", "/vagrant",
  #   :nfs => true,
  #   :mount_options => [
  #     'nfsvers=3',
  #     'vers=3',
  #     'actimeo=1',
  #     'rsize=8192',
  #     'wsize=8192',
  #     'timeo=14',
  #     :nolock,
  #     :udp,
  #     :intr,
  #     # :user, #activating this mounts noexec!
  #     :auto,
  #     :exec,
  #     :rw
  #   ],
  #   group: nil,
  #   owner: nil #

  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
    v.cpus = 2
  end

  config.vm.provision "shell", inline: <<-SHELL
    # NOTE REPO CONFIG
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

    # NOTE INSTALING PACKAGES
    sudo apt-get update
    sudo apt-get install -y \
      nodejs \
      yarn

    cd /vagrant
    rm -rf node_modules && yarn install
    
    # NOTE LPR FIRE BASH SIGNATURE
    base64 -d <<<"ICggICAgICAgICAgICAgICAoICAgICggICAgKCAgICAgICAgICAgKCAgICAgICAgICAgKCAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgIAogKVwgKSAgICAoICAgICAgIClcICkgKVwgKSApXCApICAgICAgICApXCApICAgICAgICApXCApICAoIC8oICAgICAgICAgICggICAgICAgICAgICAgCigoKS8oICAgIClcICAgICAoKCkvKCgoKS8oKCgpLyggICAgKCAgKCgpLyggICggICAgKCgpLyggIClcKCkpICAgICAoICAgKVwgKSAgICAoICAgICAKIC8oXykpKCgoKF8pKCAgICAvKF8pKS8oXykpLyhfKSkgICApXCAgLyhfKSkgKVwgICAgLyhfKSkoKF8pXCAgICAgIClcICgoKS8oICAgIClcICAgIAooXykpICAgKVwgXyApXCAgKF8pKSAoXykpIChfKSkgIF8gKChfKShfKSkgICgoXykgIChfKSkgICAgKChfKSAgXyAoKF8pIC8oXykpXyAoKF8pICAgCnwgfCAgICAoXylfXChfKSB8IF8gXHxfIF98fCB8ICB8IHwgfCB8fCB8ICAgfCBfX3wgfCBfIFwgIC8gXyBcIHwgfCB8IHwoXykpIF9ffHwgX198ICAKfCB8X18gICAvIF8gXCAgIHwgIF8vIHwgfCB8IHxfX3wgfF98IHx8IHxfXyB8IF98ICB8ICAgLyB8IChfKSB8fCB8X3wgfCAgfCAoXyB8fCBffCAgIAp8X19fX3wgL18vIFxfXCAgfF98ICB8X19ffHxfX19ffFxfX18vIHxfX19ffHxfX198IHxffF9cICBcX19fLyAgXF9fXy8gICAgXF9fX3x8X19ffCAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAK"
  SHELL
end
