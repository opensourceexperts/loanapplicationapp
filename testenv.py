import os

use_live_data = os.getenv("USE_LIVE_DATA")

if use_live_data == "True":
    print("Using live data from the API providers...")
    # code to use live data from the API providers
else:
    print("Using dummy data from the Providers module...")
    # code to use dummy data from the Providers module
