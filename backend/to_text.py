import pandas as pd
import json

def to_text(order, product):

    order = json.loads(order)
    order = pd.json_normalize(order)

    product = json.loads(product)
    product = pd.json_normalize(product)

    # Merge order with product matrix
    total_qty = order.groupby('data.WORK ORDER')['data.ORDER QTY'].sum()
    temp_data = pd.DataFrame()
    temp_data['data.TOTAL QTY'] = total_qty
    order = order.drop_duplicates(subset=['data.WORK ORDER','data.PRODUCT'],keep='first')
    order = pd.merge(order,temp_data, on='data.WORK ORDER')
    product = product.drop_duplicates(subset=['data.PRODUCT'],keep='last')

    # Merge order with product matrix
    df = pd.DataFrame()
    df = pd.merge(order, product, on = 'data.PRODUCT',how='left')

    # Define the requirement for scheduling
    no_of_work_order = repr(df.shape[0])
    no_of_line = repr(11)
    no_of_operation = repr(1)

    lines = [
          "LINE 1",
          "LINE 2",
          "LINE 31",
          "LINE 32",
          "LINE 4",
          "LINE 51",
          "LINE 52",
          "LINE 61",
          "LINE 62",
          "LINE 71",
          "LINE 81",
        ]
    machines = map_machines(lines)
    orders = map_orders(df)
    file = open("backend/MATLAB/SA-HH/sa-hh/dataset/dataset.txt","w")
    file.write(no_of_work_order + " " + no_of_line + "\n")
    for item, row in df.iterrows():
        count = 0
        for i in lines:
            uph_line = ('data.UPH ' + i)
            if uph_line in list(df.columns):
                if row[uph_line]>0:
                    count+=1
        if count > 0:
            file.write(no_of_operation + " " + repr(count))
            for i in lines:
                uph_line = ('data.UPH ' + i)
                if uph_line in list(df.columns):
                    if row[uph_line]>0:
                        hour = repr(round(row['data.TOTAL QTY']/row[uph_line],3))
                        machine = machines[i]
                        file.write(" " + repr(machine) + " " + hour)
        file.write("\n")
    file.close
    return machines, orders, order, product

def map_machines(lines):

    machines = {line: index + 1 for index, line in enumerate(lines)}
    
    return machines

def map_orders(df):

    orders = {line: index + 1 for index, line in enumerate(df['data.WORK ORDER'])}
    return orders