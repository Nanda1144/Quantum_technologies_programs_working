from graphviz import Digraph

def create_flowchart():
    dot = Digraph('Project_Scope', format='png')
    dot.attr(rankdir='TB', size='8,5')

    # Nodes for refining the objective
    dot.node('A', 'Refine the Objective', shape='box', style='filled', fillcolor='lightblue')
    dot.node('B', 'Use Quantum Technology', shape='box')
    dot.node('C', 'Use Quantum Machine Learning (QML)', shape='box')

    # Nodes for identifying limitations
    dot.node('D', 'Identify Current Limitations', shape='box', style='filled', fillcolor='lightyellow')
    dot.node('E', 'Classical Models Struggle with', shape='box')
    dot.node('F', 'High-Dimensional Data', shape='box')
    dot.node('G', 'Nonlinear Agricultural & Market Data', shape='box')
    dot.node('H', 'Models Lack Precision', shape='box')

    # Edges for refining the objective
    dot.edge('A', 'B')
    dot.edge('B', 'C')

    # Edges for identifying limitations
    dot.edge('D', 'E')
    dot.edge('E', 'F')
    dot.edge('E', 'G')
    dot.edge('F', 'H')
    dot.edge('G', 'H')

    # Connect the two main parts
    dot.edge('C', 'D')

    # Render to file
    dot.render('quantum_project_scope_flowchart')
    print('Flowchart saved as quantum_project_scope_flowchart.png')

if __name__ == '__main__':
    create_flowchart()
