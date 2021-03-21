###########################
# To run the interactive data explorer
# Check if streamlit is installed in conda env
# Or run $ conda install -c conda-forge streamlit
# Run $ streamlit run data_explorer.py
###########################

import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import datetime as dt
import streamlit as st


########################### Preparing Data ################################ 

parent_folder = os.getcwd()
data_folder =  parent_folder + '/data/'


### extracts data from all .json files in the folder
### appends them into a long table format
### site name and data type attributes are extracted from the folder/file paths and added
all_data = pd.DataFrame()

folders = {
    'riverdee/deeflow/': 'river',
    'riverdee/deerain/': 'rain'}

for folder in folders:
    for dirname, _, filenames in os.walk(data_folder + folder):
        for filename in filenames:
            if filename.rsplit('.',1)[1] == 'json':
                site = filename.rsplit('.',1)[0]
                site_data = pd.read_json(data_folder + folder + filename)
                site_data['Site'] = site.replace("riverdee-", "").replace("rain-", "")
                site_data['Type'] = folders[folder]
                site_data = site_data.rename(columns={'Timestamp':'DateTime','title':'Value'})
                all_data = all_data.append(site_data)
    all_data = all_data.reset_index(drop=True)

################################ Displaying Data/ App Layout ################################ 

st.title('Data explorer')

### Filters and sliders
radio_type = st.sidebar.radio('Choose Type', list(set(all_data['Type'])))
selection_site = st.sidebar.multiselect('Choose Site', list(set(all_data['Site'])))
start_date = all_data['DateTime'].min().date()
end_date = all_data['DateTime'].max().date()
dummy_start = dt.date(2000,1,1)
slider_timeline_start, slider_timeline_end = st.sidebar.slider('Select a range of values',start_date, end_date, (dummy_start , end_date))

### Converting date inputs to datetime format, assuming H:M:S is always midnight.
time = dt.datetime.min.time()
slider_timeline_start = dt.datetime.combine(slider_timeline_start, time)
slider_timeline_end = dt.datetime.combine(slider_timeline_end, time)



### Filters the data based on interactive selections
chrt = plt.figure()
chrt_data = all_data[ \
                            (all_data['Type']==radio_type) \
                            & (all_data['DateTime']>slider_timeline_start) \
                            & (all_data['DateTime']<slider_timeline_end) \
                            & (all_data['Site'].isin(selection_site)) \
                         ]

### Displays the figures
chrt = sns.FacetGrid(chrt_data, row='Site', height=1.7, aspect=4,)
chrt.map(sns.lineplot, 'DateTime', 'Value')

st.pyplot(chrt)

### you'll need this in future if you're adding any more charts below.
#plt.close()